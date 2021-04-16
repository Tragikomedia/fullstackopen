import express from "express";
import cors from 'cors';
import apiRouter from './routes/api';

const app = express();

//eslint-disable-next-line
app.use(cors()); 
app.use(express.json()); 

app.use('/api', apiRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
