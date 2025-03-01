import { fetchData } from "../RefreshBtn/RefreshBtn";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const handleAdd = async (name, value, setContent) => {
  if (!name.trim() || !value.trim()) {
    console.error("Name or value is empty.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/addfriend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, value, likeCount: 0 }), // Include likeCount
    });

    if (!res.ok) {
      console.error("Error adding person");
      return;
    }

    console.log("Added successfully!");

    const updatedContent = await fetchData();
    if (typeof setContent === "function") {
      setContent(updatedContent);
    } else {
      console.error("setContent is not a function!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
