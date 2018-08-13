import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
import passport from './middleware/passportLocalStrategy';
import config from './config/config.json';

const db = mongoose.connect(config.db);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

// Routes
app.use('/', routes);

app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        message: err.message
    });
});

export default app;
