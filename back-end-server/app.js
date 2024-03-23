const express = require("express");
// const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const FRONT_END_URI = process.env.FRONT_END_URI;

// middleware
const corsOptions = {
  origin: FRONT_END_URI, // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));
// app.set('trust proxy', true);

app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", FRONT_END_URI);
  next();
});

// connect MongoDB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     app.listen(PORT, () => {
//         console.log(`App is Listening on PORT ${PORT}`);
//     })
// }).catch(err => {
//     console.log(err);
// });

const mongodb_uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
console.log("mongodb_uri : " + mongodb_uri);
const client = new MongoClient(mongodb_uri);

app.get("/skills", (req, res) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(`${process.env.DB_NAME}`);
      // console.log(db);
      const collection = db.collection(`${process.env.DB_COLLECTION_NAME}`);
      const skills = await collection.find({}, {name: 1, percentage: 1}).toArray();
      // console.log(skills);
      res.send(skills);
    } finally {
      await client.close();
    }
  }
  run().catch(console.error);
});

// route
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});

app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
});