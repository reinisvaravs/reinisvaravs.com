import React, { useState } from "react";
import styles from "./InputMenu.module.css";
import Cards from "./cards/Cards";
import BottomMenu from "./bottomMenu/BottomMenu";

function InputMenu() {
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const setSortedContent = (newContent) => {
    setContent((prevContent) => {
      const sortedContent = [...newContent].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return JSON.stringify(prevContent) === JSON.stringify(sortedContent) // Prevent unnecessary re-renders
        ? prevContent
        : sortedContent;
    });
  };

  return (
    <>
      <p className={styles.p1}>PADLET.COM CLONE</p>
      <Cards
        content={content}
        setContent={setSortedContent}
        setName={setName}
        setSelectedCard={setSelectedCard}
      />
      <BottomMenu
        setContent={setSortedContent}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </>
  );
}

export default InputMenu;
