import express from 'express';
import cors from 'cors';
// import frontend from './config.js';
import shorterner from './api/routes.js';
import notFound from './lib/notFound.js';
import { handleError } from './api/middleware.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(`${frontend}`));

app.use(shorterner);

app.use(notFound);
app.use(handleError);

export default app;