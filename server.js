require('dotenv').config();
const logger = require('morgan');
const express = require('express');
const dbg = require('debug');
const path = require('path');
const runRoutes = require('./routes/run');

const debug = dbg('server:main');

const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use('/api/runs', runRoutes);

module.exports = app;
