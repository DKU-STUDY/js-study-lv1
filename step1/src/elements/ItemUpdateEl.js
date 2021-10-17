import SuperItem from './SuperItem.js';
import { BUTTON } from '../data/index.js';

/**
 * 수정 중인 아이템
 */
export default class ItemUpdate extends SuperItem {
  constructor({ item }) {
    super({item})
  }

  render() {
    return `
      <form name="modifierForm" action="">
        <fieldset>
          <legend hidden>아이템 수정</legend>
          <label>
            <span hidden>아이템 수정</span>
            <input 
              type="text" 
              value="${this._item.getName()}" 
              size="40"
              data-update-item 
            />
          </label>
          <button type="submit" data-button="${BUTTON.UPDATE_COMPLETE}">완료</button>
          <button type="button" data-button="${BUTTON.UPDATE_CANCEL}">취소</button>
        </fieldset>
      </form>
    `;
  }
}
