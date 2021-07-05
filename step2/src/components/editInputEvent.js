import { cancelItem } from "./cancelItemEvent";
import { updateItem } from "./updateItemEvent";

export const editInputEvent = () => {
  const $editInput = document.querySelectorAll(".editInput");

  const editInputKeyEvent = (event) => {
    if (event.key === "Escape") {
      const targetId = +event.target.dataset.id;
      cancelItem(event, targetId);
    }
    if (event.key === "Enter") {
      const targetId = +event.target.dataset.id;
      updateItem(event, targetId);
    }
  };

  $editInput.forEach((item) => item.addEventListener("keydown", editInputKeyEvent));
};
