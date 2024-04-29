const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + "/app/views/";
const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    dbName: "iaw_user",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(db);
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/todo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
