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
export default { buildQueryString };
