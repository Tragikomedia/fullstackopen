import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("PONG");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
