const curry = (fn, ...presetArgs) => {
  return (...args) => {
    const mergedArgs = presetArgs.concat(args);

    if (mergedArgs.length >= fn.length) {
      return fn(...mergedArgs);
    }

    return curry(fn, ...mergedArgs);
  };
};

export {
  curry,
};
