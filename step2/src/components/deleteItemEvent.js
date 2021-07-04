import { render } from "../core";
import { todoList } from "../constants/item";

export const deleteItemEvent = () => {
  const $processItemForm = document.querySelectorAll(`form[name="processItem"]`);

  const deleteItem = (event) => {
    event.preventDefault();
    const targetId = +event.target.dataset.id;

    todoList.todoItems = todoList.todoItems.filter((item) => item.id !== targetId);
    render();
  };

  $processItemForm.forEach((item) => item.addEventListener("submit", deleteItem));
};
