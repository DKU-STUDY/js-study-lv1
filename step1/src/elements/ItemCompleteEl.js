/**
 * 완료된 아이템
 */
import SuperItem from './SuperItem.js';
import { BUTTON } from '../common/consts.js';

const { NORMAL, UPDATE, DELETE } = BUTTON;
export default class ItemCompleteEl extends SuperItem {
  render() {
    return `
        <p style="color: #09F">
          ${this._item.name}
        </p>
        <input type="checkbox" data-button="${NORMAL}" checked />
        <button type="button" data-button="${UPDATE}">수정</button>
        <button type="button" data-button="${DELETE}">삭제</button>
    `;
  }
}


