import toggleItem from "./toggleItem";
import removeItem from "./removeItem";

// 아이템 수정 전환 함수
function editItem(event) {

  const $parent = event.target.parentNode;
  const originHTML = $parent.innerHTML;
  const saveChecked = $parent.querySelector(".check").checked;

  $parent.innerHTML = `
      <form name="modifierForm" action="">
          <fieldset>
              <legend hidden>아이템 수정</legend>
              <label>
                  <span hidden>아이템 수정</span>
                  <input type="text" value="${$parent.querySelector('p').innerHTML.trim()}" size="40">
              </label>
              <button type="submit">완료</button>
              <button class="cancel" type="button">취소</button>
          </fieldset>
      </form>
  `;

  function registerEvent() {
      $parent.querySelector('.complete').onclick = toggleItem;
      $parent.querySelector('.check').onclick = toggleItem;
      $parent.querySelector('.update').onclick = editItem;
      $parent.querySelector('.remove').onclick = removeItem;
  }
  function pressESC (event) {
      if (event.key === "Escape"){
          $parent.innerHTML = originHTML;
          $parent.querySelector('.check').checked = saveChecked;
          registerEvent();    
      }
  }
  
  $parent.querySelector('.cancel').onclick = function () {
      $parent.innerHTML = originHTML;
      $parent.querySelector('.check').checked = saveChecked;
      registerEvent();
  }
  $parent.addEventListener("keyup", pressESC);

  const $editForm = $parent.querySelector('form');
  $editForm.onsubmit = function (event) {
      event.preventDefault();
      const newContent = $parent.querySelector('input').value;
      $parent.innerHTML = originHTML;
      $parent.querySelector('p').innerHTML = newContent;
      $parent.querySelector('.check').checked = saveChecked;
      registerEvent();
  }
}

export default editItem;