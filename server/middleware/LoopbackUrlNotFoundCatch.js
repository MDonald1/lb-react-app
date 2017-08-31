'use strict';

const path = require('path');
module.exports = function() {
 return function loopbackUrlNotFoundCatch(req, res, next) {
   var newPath = path.normalize(__dirname + '/../../client/index.html');
   res.sendFile(newPath);
 };
};