const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../Models /Users");
const sha256 = require("crypto-js/sha256");

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.fields;
  try {
    if (req.fields.username === undefined) {
      return res.status(400).json({ message: "Missing parameter" });
    } else {
      const isUserExist = await User.findOne({ email: req.fields.email });
      if (isUserExist !== null) {
        return res.json({ message: "This email already has an account!" });
      } else {
        //   Etape 1 encrypter le mdp
        // generer un token
        const token = uid2(64);
        // POUR ENCRIPTER LE MDP
        const salt = uid2(64);
        const hash = SHA256(password + salt).toString(encBase64);

        //  Etape 2: créer le nouvel utilisateur
        const newUser = new User({
          email: email,
          username: username,
          password: password,
          token: token,
          hash: hash,
          salt: salt
        });
        // Etape 3 : sauvegarder le nouvel utilisateur dans la bdd
        await newUser.save();

        return res
          .status(200)
          .json({
            _id: newUser._id,
            email: newUser.email,
            token: newUser.token
          });
      }
    }
    console.log(req.fields);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json("hello");
});

router.post("/login", async (req, res) => {
  try {
    //  chercher quel est l'utilisateur qui veut se connecter
    const userToCheck = await User.findOne({ email: req.fields.email });
    if (userToCheck === null) {
      res.status(401).json({ message: "Unauthorized!1" });
    } else {
      const newHash = sha256(req.fields.password + userToCheck.salt).toString(
        encBase64
      );

      if (userToCheck.hash === newHash) {
        res.json({
          _id: userToCheck._id,
          token: userToCheck.token
        });
      } else {
        res.status(401).json({ message: "Unauthorized ! 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
