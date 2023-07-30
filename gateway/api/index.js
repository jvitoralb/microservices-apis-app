import frontend from '../lib/path.js';
import proxy from 'express-http-proxy';


const gateway = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(`${frontend}/public/index.html`);
    });

    app.use('/timestamp', proxy('http://localhost:3001/timestamp'));
    app.use('/header-parser', proxy('http://localhost:3002/header-parser'));
    app.use('/url-shortener', proxy('http://localhost:3003/url-shortener'));
    app.use('/exercise-tracker', proxy('http://localhost:3004/exercise-tracker'));
    app.use('/file-metadata', proxy('http://localhost:3005/file-metadata'));
}

export default gateway;