import { render } from "../core";
import { todoList } from "../constants/item";

export const updateItem = (event, target) => {
  const $updateItemForm = document.querySelectorAll(`form[name="updateItem"]`);

  event.preventDefault();
  const targetId = target !== undefined ? target : +event?.target?.dataset?.id;
  const content = Array.prototype.slice
    .call($updateItemForm)
    .filter((item) => item.dataset.id === String(targetId))[0]
    .querySelector(".editInput")
    .value.trim();

  todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.process;
  todoList.todoItems.filter((item) => item.id === targetId)[0].content = content;
  render();
};

export const updateItemEvent = () => {
  const $updateItemForm = document.querySelectorAll(`form[name="updateItem"]`);

  $updateItemForm.forEach((item) => item.addEventListener("submit", updateItem));
};
