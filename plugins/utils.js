/* eslint-disable no-unused-vars */
import Assets from '~/constants/assets';
import Icons from '~/constants/icons';
export default function ({ store }, inject) {
  const icons = Icons;
  inject('icons', icons);

  const assets = Assets;
  inject('assets', assets);
}
