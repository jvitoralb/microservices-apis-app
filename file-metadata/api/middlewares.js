import CustomError from '../lib/errors.js';


export const checkUpload = (req, res, next) => {
    if(!req.file) {
        throw new CustomError('Something is missing!', 404);
    }
    next();
}

export const handleError = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ msg: err.message });
    }

    return res.status(500).json({
        msg: 'Something went wrong, try again later!'
    });
}
