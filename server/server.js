const fallback = require('express-history-api-fallback');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', '.')));
app.use(fallback('index.html', { root: (path.resolve(__dirname, '..', '.')) }));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
