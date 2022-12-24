export default {
  SET_FLASH_CONFIG(state, { message, color, show }) {
    state.flash = {
      message: message || '',
      show: !!show,
      color: color || 'cgreen'
    };
  }
};
