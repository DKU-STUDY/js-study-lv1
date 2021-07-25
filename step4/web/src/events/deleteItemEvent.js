import { render } from '../core';
import { ajax } from 'jquery';

export const deleteItemEvent = () => {
  const $processItemForm = document.querySelectorAll(`form[name="processItem"]`);

  const deleteItem = (event) => {
    event.preventDefault();
    const targetId = +event.target.dataset.id;

    ajax({
      url: `/api/items/${targetId}`,
      type: 'DELETE',
      contentType: 'application/json',
    });

    render();
  };

  $processItemForm.forEach((item) => item.addEventListener('submit', deleteItem));
};
