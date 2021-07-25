import { render } from '../core';
import { ajax } from 'jquery';

export const doneItemEvent = () => {
  const $doneItem = document.querySelectorAll('.done');

  const doneItem = (event) => {
    const targetId = +event.target.dataset.id;

    ajax({
      url: `/api/items/toggle/${targetId}`,
      type: 'PUT',
      contentType: 'application/json',
    });

    render();
  };

  $doneItem.forEach((item) => item.addEventListener('click', doneItem));
};
