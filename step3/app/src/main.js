/** !! 동적으로 생성된 태그에 이벤트 부여가 한 번 밖에 되지 않고 있음 !! **/


/** DOM 객체 **/
const $appender = document.querySelector('form[name="appenderForm"]');
//querySelectorAll로 받았을 경우 forEach를 통해 각각 이벤트 리스너 부여해야함!
const $itemList = document.querySelector('#itemList'); //ul
const $removeBtns = $itemList.querySelectorAll('.remove');
const $editBtns = $itemList.querySelectorAll('.edit');
const $cancelBtns = $itemList.querySelectorAll('.cancel');
const $completeBtns = $itemList.querySelectorAll('.complete');
const $doneBtns = $itemList.querySelectorAll('.done');
const $revokeBtn = $itemList.querySelector('.revoke');
const $completeListBtn = document.querySelector('#completeList');
const $todoList = document.querySelector('#todoList');
const $trash = document.querySelector('#trash');

/** 이벤트 리스너**/
$appender.addEventListener('submit', send);
$removeBtns.forEach($removeBtn => $removeBtn.addEventListener('click', remove));
$editBtns.forEach($editBtn => $editBtn.addEventListener('click', edit));
$cancelBtns.forEach($cancelBtn => $cancelBtn.addEventListener('click', cancel));
$completeBtns.forEach($completeBtn => $completeBtn.addEventListener('click', complete));
$doneBtns.forEach($doneBtn => $doneBtn.addEventListener('click', done));
$completeListBtn.addEventListener('click', showCompleteList);
$todoList.addEventListener('click', todoList);
$trash.addEventListener('click', showTrashList);
/** 이벤트 함수 **/

function todoList(e) {
    e.preventDefault();
    window.location.href = 'http://localhost:3001/';
}

function showTrashList(e){
    e.preventDefault();

}

function showCompleteList(e) {
    e.preventDefault();
    $.ajax({
        type: 'GET',
        contentType: 'json',
        url: '/completeList',
        success: function (result) {
            resultArr = JSON.parse(result);
            console.log(resultArr);
            while ($itemList.lastChild) {
                $itemList.lastChild.remove();
            }
            for (let i = 0; i < resultArr.length; i++) {

                let $li = `
                    <li>
                        <p style="color: #09F"><STRIKE>NO:${resultArr[i]['NO']} || ${resultArr[i]['CONTENT']} || DATE: ${resultArr[i]['DATE']}</STRIKE></p>
                    </li>`;



                //$p.innerText = `<li> NO: ${resultArr[i]['NO']} | ${resultArr[i]['CONTENT']} | DATE: ${resultArr[i]['DATE']}<li>`;

                $itemList.innerHTML+=$li;
            }
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

function done(e) {
    e.preventDefault();
    $parent = e.target.parentNode.parentNode.parentNode;
    var txt = $parent.querySelector('input').value;
    var content =
        ` <p style = "#000000">${txt}</p>
        <button class="complete" type="button">완료</button>
        <button class="edit" type="button">수정</button>
        <button class="remove" type="button">삭제</button>`;
    $parent.innerHTML = content;
    $parent.querySelector('.complete').addEventListener('click', complete);
    $parent.querySelector('.edit').addEventListener('click', edit);
    $parent.querySelector('.remove').addEventListener('click', remove);


}

function complete(e) {
    $parent = e.target.parentNode;
    $node = $parent.querySelector('.complete');
    $parent.querySelector('p').style.color = '#09F'; //색 변환 //-> 완료/취소 일 경우 p가 없어서 안되는 듯
    $node.innerText = '취소';
    $node.className = 'cancel';

    //완료 목록으로 보내기
    //create사용
    $tsBtn = document.createElement('button');
    $tsBtn.type = 'submit';
    $tsBtn.innerText = '처리 목록으로';
    $tsBtn.className = 'transfer';
    $parent.append($tsBtn);
    $node.removeEventListener('click', complete);   //removeEventListener 삽입해서 해결 !
    $node.addEventListener('click', cancel);
    $tsBtn.addEventListener('click', transfer);
}

function transfer(e) {
    e.preventDefault();
    $parent = e.target.parentNode;
    $pNode = $parent.querySelector('p');
    let pTxt = $pNode.innerText;
    console.log(pTxt);

    // ajax로 db 보내기..?
    $parent.remove();

    //let tsUrl = "/insert";
    let dataTf = {
        pTxt: pTxt
    };
    let jDataTf = JSON.stringify(dataTf)
    /*fetch(tsUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: jData, // body data type must match "Content-Type" header
    })
        .then(response => console.log(response.json()));*/
    console.log(jDataTf)
    $.ajax({
        type: 'POST',
        data: jDataTf,
        contentType: 'application/json; charset=utf-8',
        url: '/insert',
        success: function (result) {
            console.log(result);
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

function cancel(e) {
    $parent = e.target.parentNode;
    $node = $parent.querySelector('.cancel');
    $parent.querySelector('p').style.color = '#000000'; //색 변환
    $node.innerText = '완료';
    $node.className = 'complete';
    $node.removeEventListener('click', cancel);
    $node.addEventListener('click', complete);
    $parent.lastChild.remove();
}

function edit(e) {
    $parent = e.target.parentNode;
    $originHTML = $parent.innerHTML;
    insertContent = $parent.querySelector('p').innerText;
    var content =
        `<form name="modifierForm" action="">
        <fieldset>
        <legend hidden>아이템 수정</legend>
        <label>
        <span hidden> 아이템 수정 </span>
        <input type="text" value="${insertContent}" size="40">
        </label>
        <button class ="done" type="submit">완료</button>
        <button class="revoke" type="button">취소</bytton>
        </fieldset>
        </form>`;
    $parent.innerHTML = content;

    $parent.querySelector('.done').addEventListener('click', done);
    $parent.querySelector('.revoke').addEventListener('click', revoke);

    function revoke(e) {
        e.preventDefault();
        $parent.innerHTML = $originHTML;

        $parent.querySelector('.complete').addEventListener('click', complete);
        $parent.querySelector('.edit').addEventListener('click', edit);
        $parent.querySelector('.remove').addEventListener('click', remove);
    }
}

function remove(e) {
    console.log('delete Clicked');
    $parent = e.target.parentNode;
    let trashP = $parent.querySelector('p').innerText;
    let dataTs = {
        trashP: trashP
    };
    let jDataTs = JSON.stringify(dataTs);
    console.log($parent);
    $parent.remove();
    $.ajax({
        type: 'POST',
        data: jDataTs,
        contentType: 'application/json; charset=utf-8',
        url: '/delete',
        success: function (result) {
            console.log(result);
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    })
}

function send(e) {
    e.preventDefault();
    var txt = $appender.querySelector('input').value; //입력 텍스트
    // ul 받기
    // li append하기
    var $list = document.createElement('li');
    //li 디테일 삽입
    $list.innerHTML =
        `<p style="color: #000000">${txt}</p>
                <button class="complete" type="button">완료</button>
                <button class="edit" type="button">수정</button>
                <button class="remove" type="button">삭제</button>`;
    // li를 ul에 append
    $itemList.append($list);
    // 새로 생긴 list에 이벤트 리스너 따로 생성해줘야하는듯
    //register($itemList);
    $list.querySelector('.complete').addEventListener('click', complete);
    $list.querySelector('.edit').addEventListener('click', edit);
    $list.querySelector('.remove').addEventListener('click', remove);
}

