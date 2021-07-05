import { render } from "../core";
import { todoList } from "../constants/item";

export const editItemEvent = () => {
  const $editItem = document.querySelectorAll(".edit");

  const editItem = (event) => {
    const targetId = +event.target.dataset.id;

    todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.edit;
    render();
  };
  $editItem.forEach((item) => item.addEventListener("click", editItem));
};
