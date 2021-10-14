/**
 * 완료된 아이템
 */
import SuperItem from './SuperItem.js';

export default class ItemCompleteEl extends SuperItem {
  constructor({ item }) {
    super({item});
  }

  render() {
    return `
        <p style="color: #09F">
          ${this._item.getName()}
        </p>
        <button type="button">취소</button>
        <button type="button">수정</button>
        <button type="button">삭제</button>
    `;
  }
}


