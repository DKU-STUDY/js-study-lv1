import { render } from "../core";
import { todoList } from "../constants/item";

export const addItemEvent = () => {
  const $addItemForm = document.querySelector(`form[name="addItem"]`);

  const addItem = (event) => {
    event.preventDefault();
    const content = $addItemForm.querySelector("input").value.trim();
    if (content.length === 0) {
      alert("아이템 이름을 입력해주세요.");
      return;
    }

    const newItem = {
      id: todoList.todoItems.length === 0 ? 0 : todoList.todoItems[todoList.todoItems.length - 1].id + 1,
      content,
      status: todoList.status.process,
      checked: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    todoList.todoItems.push(newItem);
    render();
  };

  $addItemForm.addEventListener("submit", addItem);
};
