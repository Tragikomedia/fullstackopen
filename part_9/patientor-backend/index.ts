import express from "express";
import cors from 'cors';

const app = express();

//eslint-disable-next-line
app.use(cors()); 
app.use(express.json()); 

app.get("/api/ping", (_req, res) => {
  res.send("PONG");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
