import helper from './helper';
const sufi = 'https://sys-dev.searchandstay.com/api/admin/calendar_patterns';
export default {
  list: (filter) => {
    const finalQuery = helper.buildQueryFilter(filter);
    return `${sufi}/${finalQuery}?per_page=5`;
  },
};
