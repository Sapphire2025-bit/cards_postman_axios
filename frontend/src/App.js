import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/card";

function App() {
    //all cards array
    const [cards, setCards] = useState([]);
    //new card text input
    const [text, setText] = useState("");
    //manage the color picker menu toggle (only one card's open at a time)
    const [activeColorPicker, setActiveColorPicker] = useState(null);

    // Fetch cards from server
    useEffect(() => {
        axios
            .get("http://localhost:5000/cards")
            .then((response) => setCards(response.data))
            .catch((error) => console.error("Error fetching cards:", error));
    }, []);

    // Add a new card
    const addCard = () => {
        axios
            .post("http://localhost:5000/cards", { text })
            .then((response) => {
                setCards([...cards, response.data]);
                setText("");
            })
            .catch((error) => console.error("Error adding a card:", error));
    };

    //update the card
    const updateCard = (id, text, colorIndex) => {
        axios
            .put(`http://localhost:5000/cards/${id}`, { text, colorIndex })
            .then((response) => {
                const updatedCardsArr = [];
                cards.forEach((card) => {
                    if (card.id === id) {
                        updatedCardsArr.push(response.data);
                    } else {
                        updatedCardsArr.push(card);
                    }
                });
                setCards(updatedCardsArr);
                setText("");
            })
            .catch((error) => console.error("Error updating a card:", error));
    };
    //update a card's color
    const updateCardColor = (id, colorId) => {
        updateCard(id, "", colorId);
    };
    //update a card's text
    const updateCardText = (id, text) => {
        updateCard(id, text, 0);
    };

    // Delete a card
    const deleteCard = (id) => {
        axios
            .delete(`http://localhost:5000/cards/${id}`)
            .then(() => setCards(cards.filter((card) => card.id !== id)))
            .catch((error) => console.error("Error deleting a card:", error));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addCard();
    };

    const openColorPicker = (id) => {
        setActiveColorPicker(activeColorPicker === id ? null : id);
    };

    const selectColor = (id, colorId) => {
        setActiveColorPicker(null);
        updateCardColor(id, colorId);
    };

    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        padding: "10px",
        margin: "20px",
    };

    return (
        <div className="App">
            <h1>Card Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Card Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit">Add Card</button>
            </form>

            <div className="grid-container" style={gridContainerStyle}>
                {cards.map((card) => (
                    <div className="grid-item" key={card.id}>
                        <Card
                            text={card.text}
                            colorId={card.colorIndex}
                            onDelete={() => deleteCard(card.id)}
                            onTextUpdate={(newText) => updateCardText(card.id, newText)}
                            onPickerSelect={() => openColorPicker(card.id)}
                            showColorPicker={activeColorPicker === card.id}
                            onColorSelect={(colorId) => selectColor(card.id, colorId)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
