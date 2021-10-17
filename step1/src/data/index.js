import ItemList from './ItemList.js';
import ItemCompleteEl from '../elements/ItemCompleteEl.js';
import ItemUpdateEl from '../elements/ItemUpdateEl.js';
import ItemNormalEl from '../elements/ItemNormalEl.js';

export const BUTTON = {
  COMPLETE: 'COMPLETE',
  UPDATE: 'UPDATE',
  NORMAL: 'NORMAL',
  DELETE: 'DELETE',
  UPDATE_COMPLETE: 'UPDATE_COMPLETE',
  UPDATE_CANCEL: 'UPDATE_CANCEL',
}

export const STATE = {
  [BUTTON.COMPLETE]: ItemCompleteEl,
  [BUTTON.UPDATE]: ItemUpdateEl,
  [BUTTON.NORMAL]: ItemNormalEl,
  [BUTTON.UPDATE_COMPLETE]: ItemNormalEl,
  [BUTTON.UPDATE_CANCEL]: ItemNormalEl,
};

export default {
  items: new ItemList(),
}
