const express = require('express');
const app = require('./app');
const { PORT } = require('./config');



// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  console.log('err is ', err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log('Serving on 8080');
});