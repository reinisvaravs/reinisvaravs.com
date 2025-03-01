import styles from "./Cards.module.css";
import firebaseLogo from "../../assets/firebaseLogo.png";
import { fetchData } from "../buttons/RefreshBtn/RefreshBtn";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { handleDelete } from "../buttons/DeleteBtn/DeleteBtn";
import { debounce } from "lodash";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Cards({ content, setContent, setName, setSelectedCard }) {
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchData();
      setContent(data);
      setLoading(false);

      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

      setLikes(
        data.reduce((acc, { name, likeCount }) => {
          acc[name] = {
            isLiked: likedPosts[name] || false, // Restore like status
            likeCount, // Keep existing like count from backend
          };
          return acc;
        }, {})
      );
    };
    loadData();
  }, [setContent]);

  const debouncedUpdate = debounce(async (name, newLikeCount) => {
    try {
      await fetch(`${API_BASE_URL}/changevalue`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, newLikeCount }),
      });
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  }, 500); // 500ms debounce delay

  const handleIsLiked = async (name, currentLikeCount) => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    const isLiked = !likedPosts[name];

    // Prevent decrementing below 0
    const newLikeCount = isLiked
      ? currentLikeCount + 1
      : Math.max(0, currentLikeCount - 1);

    // Update local storage
    likedPosts[name] = isLiked;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    // Update state
    setLikes((prevLikes) => ({
      ...prevLikes,
      [name]: { isLiked, likeCount: newLikeCount },
    }));

    debouncedUpdate(name, newLikeCount); // Call debounced function
  };

  return (
    <div className={styles.cardDiv}>
      {loading ? ( // Show Firebase animation while loading
        <img
          src={firebaseLogo}
          alt="Loading..."
          className={styles.firebaseLogo}
        />
      ) : content.length === 0 ? ( // Show message when no data exists
        <div className={styles.noContentMessage}>
          <p>No posts available. Add a new one to get started! 🚀</p>
        </div>
      ) : (
        content.map(({ name, value, likeCount }) => (
          <div className={styles.card} key={name}>
            <div className={styles.cardHeader}>
              <button
                className={styles.editBtn}
                onClick={() => setSelectedCard({ name, value })}
              >
                Edit
              </button>
              <button
                className={styles.trashBtn}
                onClick={() =>
                  handleDelete(name, setContent, () => {}, setName)
                }
              >
                <FaTrashAlt className={styles.trashIcon} />
              </button>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.name}>
                <b>{name}</b>
              </p>
              <p className={styles.value}>{value}</p>
            </div>
            <div className={styles.cardFooter}>
              <button
                className={
                  likes[name]?.isLiked ? styles.liked : styles.notLiked
                }
                onClick={() =>
                  handleIsLiked(name, likes[name]?.likeCount ?? likeCount)
                }
              >
                {likes[name]?.isLiked ? (
                  <FaHeart className={styles.heart} />
                ) : (
                  <FaRegHeart className={styles.heart} />
                )}
                <p>{likes[name]?.likeCount ?? likeCount}</p>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cards;
