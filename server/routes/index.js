
var app = require('../app');

app.use(function (req, res, next) {
  if (req.path !== '/') return next();

  res.send('This is an example Component/Express app. Please read more at https://github.com/component/boilerplate-express!');
});
