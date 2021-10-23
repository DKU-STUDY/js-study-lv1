import editItem from "./editItem";
import toggleItem from "./toggleItem";
import removeItem from "./removeItem";

// DOM 접근
export const $appenderForm = document.forms.appenderForm;
export const $todoList = document.querySelector('#todoList');

// 아이템 등록
export function appendItem(event) {
    
	event.preventDefault(); // handAppendItemButton

	const $appender = $appenderForm.querySelector('input');

	const $newItem = document.createElement('li');

	// 태그에 내용 채우기
	if($appender.value){
		$newItem.innerHTML = `
		<input class="check" type="checkbox" style="margin-right:15px">
		<p>
				${$appender.value}
		</p>
		<button class="complete" type="button">완료</button>
		<button class="update" type="button">수정</button>
		<button class="remove" type="button">삭제</button>
		`;
		$todoList.appendChild($newItem);
		$appender.value = "";
		$appender.focus();

		// 추가한 아이템 버튼 이벤트 등록
		$newItem.querySelector('.remove').onclick = removeItem;
		$newItem.querySelector('.complete').onclick = toggleItem;
		$newItem.querySelector('.check').onclick = toggleItem;
		$newItem.querySelector('.update').onclick = editItem;
	}
	else{alert("아이템 이름을 입력해주세요.")};
}