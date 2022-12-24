import helper from './helper';
const sufi = '/api/admin/calendar_patterns';
export default {
  list: (filter) => {
    const initialQuery = helper.buildQueryFilter(filter);
    return `${sufi}/${initialQuery}`;
  },
  create: `${sufi}`,
  update: (id) => `${sufi}/${id}/`,
  show: (id) => `${sufi}/${id}/`,
};
