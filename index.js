const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

const postRoutes = require("./routes/posts");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || "5000";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running at " + PORT);
    });
  })
  .catch((error) => {
    console.log("+ ERROR: ");
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
