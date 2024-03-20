const express = require("express");
const mongoose = require("mongoose");
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

// route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to Backend!" });
});

app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
});