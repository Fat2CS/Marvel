require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

app.use(formidableMiddleware());

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//TOUTES LES ROUTES qui passent de leur API et en lien avec la nôtre

// app.get("/", (req, res) => {
//   res.json({ message: "Hello" });
// });
const loginRoutes = require("./ROUTES/login");

app.use(loginRoutes);

app.get("/characters", async (req, res) => {
  // console.log("route characters");
  try {
    const { limit, skip, name } = req.query;
    console.log(limit);
    console.log(skip);

    const response = await axios.get(
      // `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=t7a7NjbAUHREgQNr&limit=${req.query.limit}&skip=${req.query.skip}&name=${req.query.name}`
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${req.query.limit}&skip=${req.query.skip}&name=${req.query.name}`
    );
    // console.log(response.data);

    res.json(response.data); // recuperer les données au front
  } catch (error) {
    console.log(error.response.data);
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  const { limit, skip, title } = req.query;
  console.log(limit);

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${req.query.limit}&skip=${req.query.skip}&title=`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  console.log("je passe pr la comicsid");
  const characterID = req.params.characterId;

  console.log(">>>>>", req.params.characterId);

  // console.log(response.data);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // res.json(characterID);
  console.log(characterID);
});

app.get("/character/:characterId", async (req, res) => {
  const characterID = req.params.characterId; //identification Id
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterID}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // res.json(response.data);
});

app.all("*", (req, res) => {
  console.log("all");

  res.json("route not find");
});
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

// app.get("/hello", (req, res) => {
//   res.json({ message: "Hello" });
// });
