import express from 'express';
import cors from 'cors';
import frontend from './lib/path.js';
import gateway from './api/index.js';
import { handleError, notFound } from './api/middlewares.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${frontend}`));

gateway(app);

app.use(notFound);
app.use(handleError);

export default app;