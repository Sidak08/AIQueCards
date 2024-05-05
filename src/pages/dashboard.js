import React, { useState } from 'react';

export default function Dashboard() {
  const [flashCards, setFlashCards] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch("/api/convert", {
      method: "POST",
      body: new FormData(e.currentTarget),
    })
    .then((res) => res.json())
    .then((data) => {
      if ("text" in data) {
        fetch("/api/genQuecard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: data.text,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          const newFlashCards = data?.quecards || [];
          setFlashCards(newFlashCards);

          // Save to localStorage
          localStorage.setItem('flashCards', JSON.stringify(newFlashCards));
        })
        .catch((err) => {
          console.error(err);
        });
      }
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleFormSubmit}>
        <input name="lecture" accept=".mp3" type="file"></input>
        <button type="submit" className="bg-white">Submit</button>
      </form>

      {/* Display flash cards */}
      <div>
        {flashCards.map((card, index) => (
          <div key={index}>
            <h3>{card.question}</h3>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
