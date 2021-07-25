import { render } from '../core';
import { ajax } from 'jquery';

export const addItemEvent = () => {
  const $addItemForm = document.querySelector(`form[name="addItem"]`);

  const addItem = (event) => {
    event.preventDefault();
    const content = $addItemForm.querySelector('input').value.trim();
    if (content.length === 0) {
      alert('아이템 이름을 입력해주세요.');
      return;
    }

    ajax({
      url: '/api/items',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'JSON',
      data: JSON.stringify({ content }),
    });

    render();
  };

  $addItemForm.addEventListener('submit', addItem);
};
