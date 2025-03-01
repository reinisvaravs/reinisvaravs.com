import React, { useEffect, useState } from "react";
import styles from "./BottomMenu.module.css";
import { handleAdd } from "../buttons/AddBtn/AddBtn";
import { IoIosArrowDown } from "react-icons/io";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function BottomMenu({ setContent, selectedCard, setSelectedCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedCard) {
      setSubject(selectedCard.name);
      setText(selectedCard.value);
      setIsModalOpen(true);
    }
  }, [selectedCard]);

  const handleNewCard = () => {
    setIsModalOpen(true);
    setSelectedCard(null);
    setSubject("");
    setText("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
    setSubject("");
    setText("");
  };

  const handlePublish = async () => {
    if (selectedCard) {
      try {
        const res = await fetch(`${API_BASE_URL}/changevalue`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: selectedCard.name, newValue: text }),
        });

        if (!res.ok) {
          console.error("Failed to update the database.");
          return;
        }

        setContent((prevContent) =>
          prevContent.map((card) =>
            card.name === selectedCard.name ? { ...card, value: text } : card
          )
        );
      } catch (error) {
        console.error("Error updating database:", error);
      }
    } else {
      await handleAdd(subject, text, setContent);
    }
    closeModal();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleNewCard} className={styles.addBtn}>
        +
      </button>
      {isModalOpen && (
        <div className={styles.popup}>
          <div className={styles.cardHeader}>
            <button className={styles.closeButton} onClick={closeModal}>
              x
            </button>
            <button
              className={`${styles.publichButton} ${
                subject.length > 0 ? styles.active : ""
              }`}
              onClick={handlePublish}
              disabled={subject.length === 0}
            >
              {selectedCard ? "Update" : "Publish"}
            </button>
          </div>
          <div className={styles.cardBody}>
            <input
              placeholder="Subject"
              className={styles.nameInput}
              value={selectedCard ? selectedCard.name : subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              className={styles.valueInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.cardFooter}></div>
        </div>
      )}
    </div>
  );
}

export default BottomMenu;
