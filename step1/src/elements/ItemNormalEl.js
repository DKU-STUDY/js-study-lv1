/**
 * 아이템의 기본 상태들
 */
import SuperItem from './SuperItem.js';
import { BUTTON } from '../common/consts.js';

const { COMPLETE, UPDATE, DELETE } = BUTTON;
export default class ItemNormalEl extends SuperItem {
  render() {
    return `
      <p>
        ${this._item.name}
      </p>
      <input type="checkbox" data-button="${COMPLETE}"/>
      <button type="button" data-button="${UPDATE}">수정</button>
      <button type="button" data-button="${DELETE}">삭제</button>
    `;
  }
}


