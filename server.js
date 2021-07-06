const express = require("express");
const mongoose = require("mongoose");
const articles = require("./articles");
const cors = require("cors");


const bodyParser = require("body-parser");
const articles2 = require("./articles2");
const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/article");

app.use("/articles", articles);
app.use("/articles2", articles2);
PORT = process.env.port || 3001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
