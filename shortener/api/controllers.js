import connect from '../database/connection.js';
import Shortener from '../database/models/Shortener.js';
import asyncWrap from '../lib/async.js';
import CustomError from '../lib/errors.js';
import shortCode from '../lib/shortenerUtils.js';


export const createSave = asyncWrap(async (req, res, next) => {
    await connect();
    
    const newShortURL = new Shortener({
        mainUrl: req.body.url,
        shortUrlCode: shortCode()
    });

    const savedShort = await newShortURL.save();
    res.status(201).json({
        original_url: savedShort.mainUrl,
        short_url: savedShort.shortUrlCode
    });
});

export const findMainURL = asyncWrap(async (req, res, next) => {
    await connect();
    
    const dataFound = await Shortener.find({mainUrl: req.body.url});

    if (!dataFound.length) {
        return next();
    }

    res.status(200).json({
        original_url: dataFound[0].mainUrl,
        short_url: dataFound[0].shortUrlCode
    });
});

export const toMainURL = asyncWrap(async (req, res, next) => {
    await connect();
    
    const { shortID } = req.params;
    const shortURL = await Shortener.find({shortUrlCode: shortID});

    if (!shortURL.length) {
        const err = new CustomError(`${shortID} Short URL does not exist!`, 404);
        return next(err);
    }

    res.status(301).redirect(shortURL[0].mainUrl);
});

const short = {
    createSave,
    findMainURL,
    toMainURL
}

export default short;