import ItemList from './ItemList.js';
import ItemCompleteEl from '../elements/ItemCompleteEl.js';
import ItemUpdateEl from '../elements/ItemUpdateEl.js';
import ItemNormalEl from '../elements/ItemNormalEl.js';
import { BUTTON } from '../common/consts.js';

export const STATE_AND_El = {
  [BUTTON.COMPLETE]: ItemCompleteEl,
  [BUTTON.UPDATE]: ItemUpdateEl,
  [BUTTON.NORMAL]: ItemNormalEl,
  [BUTTON.UPDATE_COMPLETE]: ItemNormalEl,
  [BUTTON.UPDATE_CANCEL]: ItemNormalEl,
};

export default {
  items: new ItemList(),
}
