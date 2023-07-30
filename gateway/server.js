import http from 'http';
import app from './app.js';
import { normalize } from 'path';


const PORT = normalize(process.env.PORT || '3000');

app.set('port', PORT);

const server = http.createServer(app).listen(PORT, () => {
    console.log(`Server has started on port ${server.address().port}`);
});
