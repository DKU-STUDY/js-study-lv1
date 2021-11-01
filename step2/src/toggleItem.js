// 아이템 토글 함수
function toggleItem(event) {

	const $content = event.target.parentNode.querySelector('p');
	const $parent = event.target.parentNode;
	let completed;
	let isChecked;


	// 체크박스-버튼 동기화
	// 버튼 눌렀을 때
	if(event.target.getAttribute('type') === "button"){
			completed = event.target.innerHTML === '취소';
			
			isChecked = !completed;
			$content.style.color = completed ? '' : '#09F';
			event.target.innerHTML = completed ? '완료' : '취소';
			$parent.querySelector('.check').checked = isChecked;
	} else { // 체크박스 눌렀을 때
			isChecked = event.target.checked === false;
			completed = isChecked;
			$content.style.color = completed ? '' : '#09F';

			$parent.querySelector('.complete').innerHTML = completed ? '완료' : '취소';
	}
}

export default toggleItem;