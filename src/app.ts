import cors from 'cors';
import path from 'path';
import express from 'express';
import v1Route from './route/v1/route';
import corsOptions from './config/cors';
import cookieParser from 'cookie-parser';
import error from '@middleware/error';
import logger from '@middleware/logger';
import credential from '@middleware/credential';

const app = express();
const port = process.env.port || 3000;

app.use(logger);
app.use(credential); // preflight check for cors
app.use(cors(corsOptions));
app.use(cookieParser()); // parse cookie
app.use(express.urlencoded({ extended: true })); // parse form body
app.use(express.json()); // parse json
app.use(express.static(path.join(path.dirname(__dirname), 'public')));

app.use('/v1', v1Route);

app.all('*', (req, res) => {
    res.status(404).send('* page');
});

app.use(error);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
