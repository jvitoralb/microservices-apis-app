import * as dotenv from 'dotenv';
import http from 'node:http';
import app from './app.js';
import { normalize } from 'path';


dotenv.config();

const PORT = normalize(process.env.PORT || '3004');

app.set('port', PORT);

const server = http.createServer(app).listen(PORT, () => {
    console.log(`Server has started on port ${server.address().port}`);
});
