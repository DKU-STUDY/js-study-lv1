import { ajax } from 'jquery';
import { repository } from '../app';
import { baseHtmlTemplate, processItemsTemplate, editItemTemplate } from './template';

export const completeHtml = async () => {
  const splitBaseHtml = baseHtmlTemplate().split('</ul>');

  return await ajax({
    url: '/api/items',
    type: 'GET',
  }).then((result) => {
    const items = result.map((item) =>
      !repository?.get().includes(item.idx) ? processItemsTemplate(item) : editItemTemplate(item)
    );
    const complete = [splitBaseHtml[0], ...items, splitBaseHtml[1]].join('');
    return complete;
  });
};
