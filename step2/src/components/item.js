import { state } from '../service.js';

const BLUE = '#09F';

export const item = (item, index) => {
  if (index === state.selectedItem) {
    return /*html*/ `
        <li>
        <form name="modifierForm" action="">
            <fieldset>
            <legend hidden>아이템 수정</legend>
            <label>
                <span hidden>아이템 수정</span>
                <input type="text" value="${item.content}" size="40">
            </label>
            <button type="submit">완료</button>
            <button type="button" class="canceler">취소</button>
            </fieldset>
        </form >
        </li>
        `;
  }
  return /*html*/ `
    <li>
        <p ${item.isComplete ? `style="color: ${BLUE}"` : ''}>${item.content}</p>
        <input
        type="checkbox"
        class="complete" ${item.isComplete ? 'checked' : ''}
        data-key = "${index}"
        />
        <button type="button" class="modifier" data-key="${index}">수정</button>
        <button type="button" class="deleter" data-key="${index}">삭제</button>
    </li>
    `;
};
