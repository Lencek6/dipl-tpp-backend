const express = require('express');
const path = require('path');
let app = express();


//CORS
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token,authorization');
  next();
}
app.use(allowCrossDomain);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// START OF ROUTE DEFS
let usersRouter = require('./routes/user');
app.use('/api/user', usersRouter);
// END OF ROUTE DEFS

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).send('No default engine was specified and no extension was provided')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
