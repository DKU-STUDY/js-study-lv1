import { completeHtml } from "./utils/completeHtml";
import {
  addItemEvent,
  cancelItemEvent,
  checkboxEvent,
  deleteItemEvent,
  doneItemEvent,
  editInputEvent,
  editItemEvent,
  updateItemEvent,
} from "./components/index";

export const render = () => {
  document.querySelector("body").innerHTML = completeHtml();

  addItemEvent();
  cancelItemEvent();
  checkboxEvent();
  deleteItemEvent();
  doneItemEvent();
  editInputEvent();
  editItemEvent();
  updateItemEvent();
};
