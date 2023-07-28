import express from 'express';
import cors from 'cors';
import frontend from './lib/path.js';
import fileMetadata from './api/routes.js';
import notFound from './lib/notFound.js';
import { handleError } from './api/middlewares.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${frontend}`));

app.use('/file-metadata', fileMetadata);

app.use(notFound);
app.use(handleError);

export default app;