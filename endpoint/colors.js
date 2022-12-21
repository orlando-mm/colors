import helper from './helper';
const sufi = 'https://sys-dev.searchandstay.com/api/admin/calendar_patterns';
export default {
  list: (filter) => {
    const initialQuery = helper.buildQueryFilter(filter);
    return `${sufi}/${initialQuery}`;
  }
};
