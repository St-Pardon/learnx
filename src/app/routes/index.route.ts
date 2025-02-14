import { Router } from 'express';
import AuthRoute from './auth.route';
import UserRoute from './user.route';

const indexRoute = Router();

indexRoute
    .get('/', (req, res) => {
        res.status(200).send('Testing the API');
    })
    .use('/auth', AuthRoute).use('/user', UserRoute);

export default indexRoute;
