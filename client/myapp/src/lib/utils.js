export const partial = (fn, ...arg) => fn.bind(null, ...arg);
