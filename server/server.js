import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connect.js";
import router from "./routes/route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use("/api", router);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log("Server listening on port: " + port);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
