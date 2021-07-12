if (process.env.NODE_ENV === 'production') {
    // production 환경일 때
    module.exports = require('./prod');
  } else {
    // development 환경일 때
    module.exports = require('./dev');
  }