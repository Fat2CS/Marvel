const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const formidableMiddleware = require("express-formidable");

// importer axios
const axios = require("axios");
app.use(formidableMiddleware());

//TOUTES LES ROUTES qui passent de leur API et en lien avec la nôtre

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=t7a7NjbAUHREgQNr"
    );
    res.json(response.data); // recuperer les données au front
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=t7a7NjbAUHREgQNr"
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/characterId", async (req, res) => {
  const characterID = req.params.characterid;
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apikey=t7a7NjbAUHREgQNr"
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  res.json(characterID);
});

app.get("/character/characterId", async (req, res) => {
  const characterID = req.params.characterid; //identification Id
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  res.json(characterID);
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

// app.get("/hello", (req, res) => {
//   res.json({ message: "Hello" });
// });
