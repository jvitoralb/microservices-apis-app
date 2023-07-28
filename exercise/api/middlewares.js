import { userExists } from './controllers.js';
import CustomError from '../lib/errors.js';


export const exerciseBody = (req, res, next) => {
    const { params, body } = req;
    const reqDate = new Date(body.date);

    if (!params.id || !body.description || !body.duration) {
        throw new CustomError('Something is missing!', 404);
    }

    if (reqDate == 'Invalid Date') {
        req.body.date = new Date().toLocaleDateString('en-CA');
    }
    return userExists(req, res, next);
}

export const handleError = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ msg: err.message });
    }

    return res.status(500).json({
        msg: 'Something went wrong, try again later!'
    });
}
