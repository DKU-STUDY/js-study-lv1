import { render } from "../core";
import { todoList } from "../constants/item";

export const checkboxEvent = () => {
  const $checkbox = document.querySelectorAll(".checkbox");

  const handleCheckBox = (event) => {
    const targetId = +event.target.dataset.id;

    const checkedStatus = todoList.todoItems.filter((item) => item.id === targetId)[0].checked;
    todoList.todoItems.filter((item) => item.id === targetId)[0].checked = !checkedStatus;
    render();
  };

  $checkbox.forEach((item) => item.addEventListener("click", handleCheckBox));
};
