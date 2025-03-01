import { fetchData } from "../RefreshBtn/RefreshBtn";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const handleDelete = async (name, setContent, setName) => {
  if (!name.trim()) {
    console.error("Name field is empty.");
    setName("");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/friends`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      console.error("Error deleting friend.");
      setName("");
      return;
    }

    // Remove the deleted post from local storage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (likedPosts[name]) {
      delete likedPosts[name]; // Remove the deleted post
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts)); // Save the updated list
    }

    const updatedContent = await fetchData();
    setContent(updatedContent);
    setName("");
  } catch (error) {
    console.error("Error deleting person:", error);
    setName("");
  }
};

function DeleteBtn({ name, setContent, setName }) {
  return (
    <button onClick={() => handleDelete(name, setContent, showRed, setName)}>
      Delete
    </button>
  );
}

export default DeleteBtn;
