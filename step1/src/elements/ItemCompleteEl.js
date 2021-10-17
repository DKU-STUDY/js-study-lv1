/**
 * 완료된 아이템
 */
import SuperItem from './SuperItem.js';
import { BUTTON } from '../data/index.js';

export default class ItemCompleteEl extends SuperItem {
  constructor({ item }) {
    super({item});
  }

  render() {
    return `
        <p style="color: #09F">
          ${this._item.getName()}
        </p>
        <input type="checkbox" data-button="${BUTTON.NORMAL}" checked />
        <button type="button">수정</button>
        <button type="button">삭제</button>
    `;
  }
}


