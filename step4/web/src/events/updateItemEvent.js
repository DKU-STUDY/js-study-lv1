import { ajax } from 'jquery';
import { repository } from '../app';
import { render } from '../core';

export const updateItem = (event, target) => {
  const $updateItemForm = document.querySelectorAll(`form[name="updateItem"]`);

  event.preventDefault();
  const targetId = target !== undefined ? target : +event?.target?.dataset?.id;
  const content = Array.prototype.slice
    .call($updateItemForm)
    .filter((item) => item.dataset.id === String(targetId))[0]
    .querySelector('.editInput')
    .value.trim();

  ajax({
    url: `/api/items/${targetId}`,
    type: 'PUT',
    contentType: 'application/json',
    dataType: 'JSON',
    data: JSON.stringify({ content }),
  }).then(() => {
    repository.set(repository.get().filter((item) => item !== targetId));
  });

  render();
};

export const updateItemEvent = () => {
  const $updateItemForm = document.querySelectorAll(`form[name="updateItem"]`);

  $updateItemForm.forEach((item) => item.addEventListener('submit', updateItem));
};
