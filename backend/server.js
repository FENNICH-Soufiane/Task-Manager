const express = require("express");

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

require("dotenv").config({ path: "config.env" });

const app = express();
const taskRoutes = require('./routes/taskRoute')
const connectDB = require("./config/connectDb");


app.get("/", (req, res) => {
  res.send(process.env.name);
});

const port = 7000;

// connect to mongodb before connect to express server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(`error ${err}`);
  }
};
startServer();



// lists of middleware---------------
// middleware pour gérer les données JSON en accédant aux données JSON analysées via req.body
// dans gestionnaires de route (permet de retourner des données sous form JSON)
app.use(express.json());
app.use(express.urlencoded({extended: false})); // for form urlencoded request
app.use(cors()); // cors must op of the route
app.use("/api/tasks", taskRoutes); // Ajout du middleware de routage
