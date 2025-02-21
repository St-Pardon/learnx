import express from 'express';
import helmet from 'helmet';
import indexRoute from './app/routes/index.route';
import './app/middlewares/auth.middleware';

const app = express();

app.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(helmet())
    .use('/', indexRoute);

export default app;
