import express from 'express';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import webpush from 'web-push';
import fs from 'fs';

import apiRouter from './api';

const port = 7874;
const app = express();

webpush.setVapidDetails(
    `mailto:erwor@erwor.me`,
    `BB6EXEBNhCcykz3CeI7afdxwzstx1tFWrk4hXLWSf4Ma5hZUOB0wUEtkgLw3uLrReW1rsW0vEhKoNYghFHx_-Ko`,
    fs.readFileSync(path.join(__dirname, '../keys/vapid-private.key')).toString(),
);

app.use(bodyParser.json());
app.set('trust proxy', true);

if (process.env.NODE_ENV == 'DEV') {
    app.use(morgan('dev'))
}

app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, '../public')))

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port: ${port}`)
})