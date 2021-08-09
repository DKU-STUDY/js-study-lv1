import { ajax } from 'jquery';
import { repository } from '../app';
import { render } from '../core';

export const cancelItem = (event, target) => {
  const targetId = target !== undefined ? target : +event?.target?.dataset?.id;

  if (repository.get().includes(targetId)) {
    repository.set(repository.get().filter((item) => item !== targetId));
  }
  if (!repository.get().includes(targetId)) {
    ajax({
      url: `/api/items/toggle/${targetId}`,
      type: 'PUT',
    });
  }

  render();
};

export const cancelItemEvent = () => {
  const $cancelItem = document.querySelectorAll('.cancel');

  $cancelItem.forEach((item) => item.addEventListener('click', cancelItem));
};
