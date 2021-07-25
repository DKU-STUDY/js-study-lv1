import { repository } from '../app';
import { render } from '../core';

export const editItemEvent = () => {
  const $editItem = document.querySelectorAll('.edit');

  const editItem = (event) => {
    const targetId = +event.target.dataset.id;

    repository.set([...repository.get(), targetId]);

    render();
  };
  $editItem.forEach((item) => item.addEventListener('click', editItem));
};
