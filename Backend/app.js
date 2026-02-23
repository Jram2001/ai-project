var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const winston = require('winston');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');

const appLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ],
});

const mongodbURI = process.env.mongodbURI;
mongoose.connect(mongodbURI)
    .then(() => {
        appLogger.info('Connected to MongoDB!');
    })
    .catch((err) => {
        appLogger.error('Error while connecting the db', { error: err });
    });

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Add logging middleware
app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;