const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const connectToMongo = require("./services/mongo");
const router = require("./routes/index");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("OK");
});

const startServer = (PORT) => {
  app.listen(PORT, async () => {
    await connectToMongo(process.env.MONGO_URI);
    console.log(`listening on PORT ${PORT}`);
  });
};

startServer(process.env.PORT || 80);
