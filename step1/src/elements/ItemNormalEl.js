/**
 * 아이템의 기본 상태들
 */
import SuperItem from './SuperItem.js';
import { BUTTON } from '../data/index.js';
export default class ItemNormalEl extends SuperItem {
  constructor({ item }) {
    super({item});
  }

  render() {
    return `
      <p>
        ${this._item.getName()}
      </p>
      <button type="button" data-button="${BUTTON.COMPLETE}">완료</button>
      <button type="button" data-button="${BUTTON.UPDATE}">수정</button>
      <button type="button" data-button="${BUTTON.DELETE}">삭제</button>
    `;
  }
}


