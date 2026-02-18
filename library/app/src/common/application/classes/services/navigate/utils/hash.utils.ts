export const createHashFromObject = (object: Record<string, any>) => {
  const objectKeys = Object.keys(object);
  let hash = '';

  for (let key in objectKeys) {
    const parameterKey = objectKeys[key];
    const parameterValue = object[parameterKey];

    switch (typeof parameterValue) {
      case 'object':
        hash += `${parameterKey}(${createHashFromObject(parameterValue)})&`;
        break;
      case 'string':
      case 'number':
        hash += `${parameterKey}=${parameterValue}&`;
        break;
      case 'boolean':
        parameterValue && (hash += `${parameterKey}&`);
        break;
    }
  }
  return hash.replace(/&$/, '');
};
