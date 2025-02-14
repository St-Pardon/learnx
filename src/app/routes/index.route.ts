import { Router } from 'express';
import AuthRoute from './auth.route';

const indexRoute = Router();

indexRoute
    .get('/', (req, res) => {
        res.status(200).send('Testing the API');
    })
    .use('/auth', AuthRoute);

export default indexRoute;
