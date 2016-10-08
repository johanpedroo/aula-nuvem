module.exports = function (app) {
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Token Inválido');
    }
  });
}
  