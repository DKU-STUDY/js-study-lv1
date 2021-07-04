import { render } from "../core";
import { todoList } from "../constants/item";

export const cancelItem = (event, target) => {
  const $cancelItem = document.querySelectorAll(".cancel");

  const targetId = target !== undefined ? target : +event?.target?.dataset?.id;

  todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.process;
  todoList.todoItems.filter((item) => item.id === targetId)[0].checked = false;
  render();
};

export const cancelItemEvent = () => {
  const $cancelItem = document.querySelectorAll(".cancel");

  $cancelItem.forEach((item) => item.addEventListener("click", cancelItem));
};
