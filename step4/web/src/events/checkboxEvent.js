import { render } from '../core';
import { ajax } from 'jquery';

export const checkboxEvent = () => {
  const $checkbox = document.querySelectorAll('.checkbox');

  const handleCheckBox = (event) => {
    const targetId = +event.target.dataset.id;

    ajax({
      url: `/api/items/toggle/${targetId}`,
      type: 'PUT',
    });

    render();
  };

  $checkbox.forEach((item) => item.addEventListener('click', handleCheckBox));
};
