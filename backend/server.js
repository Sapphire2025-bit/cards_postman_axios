const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory book data
let cards = [
    { id: 1, text: "Text a", colorIndex: 1 },
    { id: 2, text: "Text b", colorIndex: 2 },
    { id: 3, text: "Text c", colorIndex: 3 },
    { id: 4, text: "Text d", colorIndex: 4 },
];

// READ: Get all cards
app.get("/cards", (req, res) => {
    res.json(cards);
});

// CREATE: Add a new card
app.post("/cards", (req, res) => {
    let maxId = 0;
    cards.forEach((card) => {
        if (card.id > maxId) maxId = card.id;
    });
    const newCard = {
        id: maxId + 1,
        text: req.body.text,
        colorIndex: 1,
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// UPDATE: Update a card
app.put("/cards/:id", (req, res) => {
    const id = req.params.id;
    const cardIndex = cards.findIndex((card) => card.id == id);

    if (cardIndex !== -1) {
        let card = cards[cardIndex];
        if (req.body.text != "") card.text = req.body.text;
        if (req.body.colorIndex) card.colorIndex = req.body.colorIndex;
        cards[cardIndex] = card;
        res.json(card);
    } else {
        res.status(404).send("Card not found");
    }
});

// DELETE: Delete a card
app.delete("/cards/:id", (req, res) => {
    const id = req.params.id;
    cards = cards.filter((card) => card.id != id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
