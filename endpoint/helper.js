const buildQueryString = (params) => {
  if (params)
    return (
      '?' +
      Object.keys(params)
        .filter((key) => params[key] !== null && params[key] !== '')
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    );
  else return '';
};
const buildQueryFilter = (params) => {
  return params ? `?${params}=true` : '';
};
export default { buildQueryString, buildQueryFilter };
