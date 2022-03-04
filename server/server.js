const fallback = require('express-history-api-fallback');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', '.')));
app.use(fallback('index.html', { root: '../' }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});