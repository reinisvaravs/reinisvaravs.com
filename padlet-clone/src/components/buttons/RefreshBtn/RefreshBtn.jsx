import React from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchData = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/friends`);
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const result = await res.json();

    return Object.entries(result.data || {}).map(([name, details]) => ({
      name,
      value: details.value,
      likeCount: details.likeCount,
    }));
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};

export function RefreshBtn({ buttonText, setButtonText }) {
  const handleRefresh = async () => {
    setButtonText("Refreshing...");
    const data = await fetchData();
    setContent(data);
    setButtonText("Refresh ✅");

    setTimeout(() => {
      setButtonText("Refresh");
    }, 1000);
  };

  return (
    <button id="refreshBtn" onClick={handleRefresh}>
      {buttonText}
    </button>
  );
}

export default RefreshBtn;
