import mongoose from 'mongoose';
import User from '../database/models/User.js';
import Exercise from '../database/models/userExercise.js';
import connect from '../database/connection.js';
import convertDate from '../lib/format-date.js';
import asyncWrap from '../lib/async.js';
import CustomError from '../lib/errors.js';


export const createUser = asyncWrap(async (req, res, next) => {
    await connect();

    const { username } = req.body;
    const newUser = new User({
        username: username.trim()
    });

    const savedUser = await newUser.save();

    res.status(201).json({
        username: savedUser.username,
        _id: savedUser._id
    });
});

export const getAllUsers = asyncWrap(async (req, res, next) => {
    await connect();

    const allUsers = await User.find({})
    .select('_id username');

    res.status(200).send(allUsers);
});

export const userExists = asyncWrap(async (req, res, next) => {
    await connect();

    const { id } = req.params;
    const result = await User.exists({ _id: id});

    if (!result) {
        const err = new CustomError(`No user with ID: ${id}`, 404);
        return next(err);
    }

    return next();
});

const updateUser = async (user, update, next) => {
    await connect();

    let options = {
        new: true
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(user, {
            $set: {
                ...update.set
            },
            $push: {
                log: mongoose.mongo.ObjectId(update.push.log)
            }
        }, options).select('-log -__v');
        return userUpdate;
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const createExercise = asyncWrap(async (req, res, next) => {
    await connect();

    const { params, body } = req;
    const newExercise = new Exercise({
        _id: new mongoose.Types.ObjectId,
        user: params.id,
        description: body.description,
        duration: body.duration,
        date: body.date
    });

    const savedExercise = await newExercise.save();
    // Need to Update user, otherwise tests will fail
    const { _id, username, description, duration } = await updateUser(savedExercise.user._id, {
            set: {
                description: body.description,
                duration: body.duration
            },
            push: { log: savedExercise._id }
        }, next
    );

    res.status(201).json({
        _id,
        username,
        description,
        duration,
        date: convertDate(body.date)
    });
});

export const getUserLogs = asyncWrap(async (req, res, next) => {
    await connect();

    const { params, query } = req;
    const matchConfig = {
        date: {
            $gte: query.from,
            $lte: query.to
        }
    }

    const countDocs = await Exercise.countDocuments({user: params.id});
    const { id, username, log } = await User.findById(params.id)
    .populate({
        path:'log',
        select: '-_id -user -__v',
        match: query.from && query.to ? matchConfig : null,
        perDocumentLimit: query.limit || null
    });

    res.status(200).json({
        username,
        count: countDocs,
        id,
        log: log.map(obj => ({
            description: obj.description,
            duration: obj.duration,
            date: convertDate(obj.date)
        }))
    });
});

const tracker = {
    createUser,
    getAllUsers,
    userExists,
    updateUser,
    createExercise,
    getUserLogs
}

export default tracker;