export const isBlank = (str) => {
  if (str === undefined || str === null) {
    return true;
  }

  if (typeof str !== 'string') {
    throw new Error("not a string!");
  }

  return !str.trim();
}

export const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

export default {
  isBlank, uuidv4
}
