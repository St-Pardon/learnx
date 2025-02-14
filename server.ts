import App from './src/app';
import { PORT } from './src/config/env.config';
import { sequelize } from './src/models/index.model';

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Drop and re-sync db.');
    })
    .catch((err: any) => {
        console.log('Unable to sync database & tables: ', err);
    });

App.listen(PORT, () => {
    console.log(`Server running at https://127.0.0.1:${PORT}`);
});
