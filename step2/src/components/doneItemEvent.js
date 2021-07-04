import { render } from "../core";
import { todoList } from "../constants/item";

export const doneItemEvent = () => {
  const $doneItem = document.querySelectorAll(".done");

  const doneItem = (event) => {
    const targetId = +event.target.dataset.id;

    todoList.todoItems.filter((item) => item.id === targetId)[0].checked = true;
    render();
  };

  $doneItem.forEach((item) => item.addEventListener("click", doneItem));
};
