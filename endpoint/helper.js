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
  let query = '?';
  Object.keys(params).forEach((key) => {
    if (key !== '' && key !== 'romantic') {
      query += `${key}=${params[key]}&`;
    }
  });
  query = query == null || query.length === 0 || query === '?' ? null : query.substring(0, query.length - 1);
  return query || '';
};
export default { buildQueryString, buildQueryFilter };
