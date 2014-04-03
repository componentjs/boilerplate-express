
var serveStatic = require('serve-static');
var compress = require('compression');
var resolve = require('path').resolve;
var express = require('express');
var logger = require('morgan');

var app = module.exports = express();

// resolve the root directly
var root = resolve(__dirname, '..');
var env = process.env.NODE_ENV || 'development';

// use a real logger in production
// hide the logger during tests because it's annoying
if (env !== 'production' && env !== 'test') app.use(logger());

app.use(compress());

// always serve the public directory
app.use(serveStatic(resolve(root, 'public')));

// don't serve components in production
if (env !== 'production') {
  // only load this dependency when necessary
  var serveComponent = require('component-middleware');
  // serve build.js and build.css
  app.use(serveComponent());
  // serve your components' files
  app.use(serveStatic(root));
  // serve your dependencies' files
  app.use(serveStatic(resolve(root, 'components')));
}
