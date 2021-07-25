import { completeHtml } from './templates/completeHtml';
import {
  addItemEvent,
  cancelItemEvent,
  checkboxEvent,
  deleteItemEvent,
  doneItemEvent,
  editInputEvent,
  editItemEvent,
  updateItemEvent,
} from './events/index';

export const render = async () => {
  document.querySelector('body').innerHTML = await completeHtml();

  addItemEvent();
  cancelItemEvent();
  checkboxEvent();
  deleteItemEvent();
  doneItemEvent();
  editInputEvent();
  editItemEvent();
  updateItemEvent();
};
