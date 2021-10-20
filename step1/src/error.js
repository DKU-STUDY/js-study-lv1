import configs from './common/configs.js';

export const invalidTypeError = (message = '') => {
  error(`invalid type error! ${message}`);
}
export const illegalArgumentsError = (message = '') => {
  error(`illegal arguments error! ${message}`);
}

function error (errorObject) {
  if (configs.isProduction) {
    return console.error(errorObject);
  }
  throw errorObject;
}

export const overrideSuperClassError = (message = '') => {
  error(`override super class error! ${message}`);
}
