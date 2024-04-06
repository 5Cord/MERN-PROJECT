import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
import UserModel from "../models/user.js"


export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');;
    if (token) {
        try {
            const decoded = jwt.verify(token, 'pricol123');

            req.userId = decoded._id;
            next();
        } catch (e) {
            res.status(403).json({
                message: 'Нет доступа',
            })
        }

    } else {
        res.status(403).json({
            message: 'Нет доступа',
        })
    }
}