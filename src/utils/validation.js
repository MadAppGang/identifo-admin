const hasError = validation => Object.values(validation).some(value => !!value);

const applyRules = rules => (field, ...args) => {
  return rules[field](...args);
};

const reset = validation => Object.entries(validation)
  .map(entry => [entry[0], ''])
  .reduce((output, entry) => ({ ...output, [entry[0]]: entry[1] }), {});

export {
  hasError,
  applyRules,
  reset,
};
