const cors = require("cors");
const express = require("express");
const usersRouter = require("./routes/routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use("/restaurant", usersRouter);

//connection to MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(() => {
    console.log("Connexion à MongoDB échouée !");
  });

// Server Start
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Launching Server on PORT ${process.env.SERVER_PORT}`);
});
