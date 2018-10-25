import { helper } from '@ember/component/helper';

export default helper(([timestamp]) => {
  const date = new Date(timestamp);

  return date.getFullYear();
});
