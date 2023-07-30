import frontend from '../lib/path.js';
import proxy from 'express-http-proxy';


const gateway = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(`${frontend}/public/index.html`);
    });

    app.use('/timestamp', proxy('http://localhost:3001'));
    app.use('/header-parser', proxy('http://localhost:3002'));
    app.use('/url-shortener', proxy('http://localhost:3003'));
    app.use('/exercise-tracker', proxy('http://localhost:3004'));
    app.use('/file-metadata', proxy('http://localhost:3005'));
}

export default gateway;