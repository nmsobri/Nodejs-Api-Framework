import { CorsOptions } from 'cors';
import whiteList from './whitelist';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Cors not allowed'));
        }
    },
    optionsSuccessStatus: 200,
};

export default corsOptions;
