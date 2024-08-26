import express from 'express';
import cors from 'cors';
import tourRoutes from '../src/routes/tourRoutes'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
}));

app.use('/tours', tourRoutes);

export default app;