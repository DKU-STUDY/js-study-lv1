/** !! 동적으로 생성된 태그에 이벤트 부여가 한 번 밖에 되지 않고 있음 !! **/


/** DOM 객체 **/
var $appender = document.querySelector('form[name="appenderForm"]');
//querySelectorAll로 받았을 경우 forEach를 통해 각각 이벤트 리스너 부여해야함!
var $itemList = document.querySelector('#itemList'); //ul
var $removeBtns = $itemList.querySelectorAll('.remove');
var $editBtns = $itemList.querySelectorAll('.edit');
var $cancelBtns = $itemList.querySelectorAll('.cancel');
var $completeBtns = $itemList.querySelectorAll('.complete');
var $doneBtns = $itemList.querySelectorAll('.done');

/** 이벤트 리스너**/
$appender.addEventListener('submit', send);
$removeBtns.forEach(function ($removeBtn) {
        $removeBtn.addEventListener('click', remove);
    }
);
$editBtns.forEach(function ($editBtn) {
    $editBtn.addEventListener('click', edit);
});
$cancelBtns.forEach(function ($cancelBtn) {
    $cancelBtn.addEventListener('click', cancel);
});
$completeBtns.forEach(function ($completeBtn) {
    $completeBtn.addEventListener('click', complete);
});
$doneBtns.forEach(function ($doneBtn){
    $doneBtn.addEventListener('click', done);
})

//이벤트 추가 함수
function register($parent) { // 한 번 밖에 작동 안됨!!!
    $parent.querySelectorAll('.complete').forEach(function ($complete){
        $complete.addEventListener('click', complete);
    });
    $parent.querySelectorAll('.cancel').forEach(function ($cancel){
        $cancel.addEventListener('click', cancel);
    });
    $parent.querySelectorAll('.done').forEach(function ($done){
        $done.addEventListener('click', done);
    });
}

/** 이벤트 함수 **/
function done(e){
    e.preventDefault();
    $parent = e.target.parentNode.parentNode.parentNode;
    var txt = $parent.querySelector('input').value;
    var content =
        '<p style = "#000000">' + txt +'</p>' +
        '<button class="complete" type="button">완료</bytton>' +
        '<button class="edit" type="button">수정</bytton>' +
        '<button class="remove" type="button">삭제</bytton>';
    $parent.innerHTML = content;
    register($parent);
}

function complete(e) {
    $parent = e.target.parentNode;
    $node = $parent.querySelector('.complete');
    $parent.querySelector('p').style.color = '#09F'; //색 변환
    $node.innerHTML = '취소';
    $node.className = 'cancel';
    register($parent);
}

function cancel(e) {
    $parent = e.target.parentNode;
    $parent.querySelector('p').style.color = '#000000'; //색 변환
    $parent.querySelector('.cancel').innerHTML = '완료';
    $parent.querySelector('.cancel').className = 'complete';
    register($parent);
}

function edit(e) {
    $parent = e.target.parentNode;
    $insertContent = $parent.querySelector('p').innerHTML.trim();
    var content =
        '<form name="modifierForm" action="">' +
        '<fieldset>' +
        '<legend hidden>아이템 수정</legend>' +
        '<label>' +
        '<span hidden> 아이템 수정 </span>' +
        '<input type="text" value="' + $insertContent + '" size="40">' +
        '</label>' +
        '<button class ="done" type="submit">완료</button>' +
        '<button class="cancel" type="button">취소</bytton>' +
        '</fieldset>' +
        '</form>';
    $parent.innerHTML = content;

    register($parent);
}

function remove(e) {
    console.log('delete Clicked');
    $parent = e.target.parentNode;
    $parent.remove();
}

function send(e) {
    e.preventDefault();
    var txt = $appender.querySelector('input').value; //입력 텍스트
    // ul 받기
    // li append하기
    var $list = document.createElement('li');
    //li 디테일 삽입
    $list.innerHTML = '<p style="color: #000000">\n' +
                 txt +
        '        </p>\n' +
        '        <button class="complete" type="button">완료</button>\n' +
        '        <button class="edit" type="button">수정</button>\n' +
        '        <button class="remove" type="button">삭제</button>';
    // li를 ul에 append
    $itemList.append($list);
    // 새로 생긴 list에 이벤트 리스너 따로 생성해줘야하는듯
    //register($itemList);
    $list.querySelector('.complete').addEventListener('click', complete);
    $list.querySelector('.edit').addEventListener('click', edit);
    $list.querySelector('.remove').addEventListener('click', remove);
}

