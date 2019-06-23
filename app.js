const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const app = express();
// const notFoundPage = require('./public/notFoundPage');
// const severErrorPage = require('./public/serverError');

// app.get('/', (req, res) => {
//   res.send('Hello');
// });
app.use(volleyball); //logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)

app.use('/api', require('./server/api/lyrics'));

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '.', 'client', 'index.html'));
// });
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 8080;
const { db } = require('./server/db/models');

db.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`

        Listening on port ${PORT}

        http://localhost:${PORT}/

    `)
  );
});
