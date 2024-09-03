import express from 'express';
import cors from 'cors';
import tourRoutes from '../src/routes/tourRoutes'
import reviewRoutes from '../src/routes/reviewRoutes'
import userRoutes from '../src/routes/userRoutes'
import searchRoutes from '../src/routes/searchRoutes'
import categoryRoutes from '../src/routes/categoryRoutes'
import countriesRoutes from '../src/routes/countryRoutes'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
}));

app.use('/tours', tourRoutes);
app.use('/countries', countriesRoutes)
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);
app.use('/categories', categoryRoutes)

export default app;