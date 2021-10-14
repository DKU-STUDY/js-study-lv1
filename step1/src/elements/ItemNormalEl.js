/**
 * 아이템의 기본 상태들
 */
import SuperItem from './SuperItem.js';

export default class ItemNormalEl extends SuperItem {
  constructor({ item }) {
    super({item});
  }

  render() {
    return `
      <p>
        ${this._item.getName()}
      </p>
      <button type="button">완료</button>
      <button type="button">수정</button>
      <button type="button">삭제</button>
    `;
  }
}


