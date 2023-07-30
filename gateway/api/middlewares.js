import CustomError from '../lib/errors.js';


export const handleError = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ msg: err.message });
    }

    return res.status(500).json({
        msg: 'Something went wrong, try again later!'
    });
}

export const notFound = (req, res) => {
    res.status(404).send('Something is missing!');
}