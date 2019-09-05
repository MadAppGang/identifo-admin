const toSnakeCase = (value) => {
  return value.repalce(/[A-Z]/, match => `_${match.toLowerCase()}`);
};

const toCamelCase = (value) => {
  return value.replace(/_(\w)/, (_, char) => char.toUpperCase());
};

export const toDeepCase = (input, targetCase) => {
  const toTargetCase = targetCase === 'camel' ? toCamelCase : toSnakeCase;

  const result = Object.entries(input)
    .map((entry) => {
      const [key, value] = entry;

      if (typeof value === 'object') {
        return [toTargetCase(key), toDeepCase(value, targetCase)];
      }

      return [toTargetCase(key), value];
    })
    .reduce((output, entry) => {
      const [key, value] = entry;
      return { ...output, [key]: value };
    }, {});

  return result;
};
