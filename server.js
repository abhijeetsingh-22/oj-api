require('dotenv').config();
const logger = require('morgan');
const express = require('express');
const dbg = require('debug');
const path = require('path');
const runRoutes = require('./routes/run');
const langRoutes = require('./routes/langs');
const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));

app.use('/api/runs', runRoutes);
app.use('/api/langs', langRoutes);

module.exports = app;
