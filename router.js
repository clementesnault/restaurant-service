const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = "clé";

const users = [{ id: 1, username: "admin", password: "password123" }];

module.exports = app;

const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);

  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Error. Need a token" });
  }

  // Véracité du token
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Bad token" });
    } else {
      return next();
    }
  });
};

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send("Home Page");
});
app.get("/api", checkTokenMiddleware, (req, res) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false });
  if (token) {
    res.send("api");
  }
});
app.get("/api/user", checkTokenMiddleware, (req, res) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false });
  return res.json({ content: decoded });
});
app.get("/api/restaurant", checkTokenMiddleware, (req, res) => {
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Décodage du token
  const decoded = jwt.decode(token, { complete: false });
  return res.json({ content: decoded });
});
app.post("/login", (req, res) => {
  if (!req.query.username || !req.query.password) {
    return res.status(400).json({
      message: "Error. Please enter the correct username and password",
    });
  }

  // Checking
  const user = users.find(
    (u) =>
      u.username === req.query.username && u.password === req.query.password
  );

  // Pas bon
  if (!user) {
    return res.status(400).json({ message: "Error. Wrong login or password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    SECRET,
    { expiresIn: "3 hours" }
  );

  return res.json({ access_token: token });
});

app.use((req, res) => {
  res.status(404);
  res.send("Page Not Found");
});
