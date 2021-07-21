const base_url = 'http://localhost:3000';

const $app = document.querySelector('#app');
const $itemList = document.querySelector('#app ul');
const $appenderForm = document.querySelector('form[name="appenderForm"]');

// http 요청을 보내는 util 함수
const sendHttpRequest = (method, url, data) => {
    return fetch(base_url + url, {
        method: method,
        body: JSON.stringify(data),
        headers: data? {'Content-Type': 'application/json'} : {}
    })
    .then(response => {
        if(response.status >= 400){
            return response.json().then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
            });
        }
        // console.log(response);
        return response.json();
    });
};

// 아이템 템플릿
const itemTemplate = (items, selectedItem) => `${items.map((item) => {
    if(item.id === selectedItem){
        return `
            <li>
            <form name="modifierForm" action="">
                <legend hidden>아이템 수정</legend>
                    <input type="text" value="${item.content}" size="40" data-idx="${item.id}">
                <button type="submit">완료</button>
                <button type="button" class="cancelEditBtn">취소</button>
            </form>
            </li>
        `;
    }
    return `
        <li>
            <p ${item.completed ? 'style="color:#09f;text-decoration-line:line-through"': ''}>
                <input class="complete" type="checkbox" ${item.completed ? 'checked' : ''} />
                ${item.content}
            </p>
            <button type="button" class="modifier" data-idx="${item.id}">수정</button>
            <button type="button" class="deleter" data-idx="${item.id}">삭제</button>
        </li>`;
}).join('')}
`;


// 아이템 render
function render(data){
    // console.log(data.selectedItem);
    $itemList.innerHTML = itemTemplate(data.items, data.selectedItem);

    // 아이템 수정 버튼 관리
    const $modifiers = $app.querySelectorAll('.modifier');
    $modifiers.forEach(($modifier) => {
        $modifier.addEventListener('click', editItem);
    });

    // 아이템 수정 관리
    const $modifierForm = document.querySelector('form[name="modifierForm"]');
    if($modifierForm){
        $modifierForm.addEventListener('submit', updateItem);
        // 아이템 수정 취소 버튼 관리
        const $cancelEditBtns = $app.querySelectorAll('.cancelEditBtn');
        $cancelEditBtns.forEach(($cancelEditBtn) => {
            $cancelEditBtn.addEventListener('click', cancelEdit);
        });
    }

}

// 아이템 조회
const viewItem = () => {
    sendHttpRequest('GET', '/api/items')
    .then(responseData => {
        // console.log(responseData);
        render(responseData);
    })
    .catch(err => {
        console.error(err, err.data);
    });
};

// 아이템 추가
const addItem = (event) => {
    event.preventDefault();
    const item = {
        content: event.target.querySelector('input').value
    }

    sendHttpRequest('POST', '/api/items', item)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.error(err, err.data);
    });

    viewItem();
    event.target.querySelector('input').value = '';
    event.target.querySelector('input').focus();

}

// 아이템 수정 버튼
const editItem = (event) => {
    const selectedItem = {
        selectedItem: event.target.dataset.idx
    };
    
    sendHttpRequest('PUT', '/api/items', selectedItem)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.error(err, err.data);
    });

    viewItem();
}

// 아이템 수정 모드 취소
const cancelEdit = () => {
    const selectedItem = {
        selectedItem: -1
    };

    sendHttpRequest('PUT', '/api/items', selectedItem)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.error(err, err.data);
    });

    viewItem();
};

// 아이템 수정
const updateItem = (event) => {
    event.preventDefault();

    // 특정 아이템을 찾아서 업데이트
    const itemId = event.target.querySelector('input').dataset.idx;
    console.log(itemId);

    const item = {
        content: event.target.querySelector('input').value
    }
    console.log(item);

    sendHttpRequest('PUT', '/api/items/' + itemId, item)
    .then(responseData => {
        console.log(responseData);
    })
    .catch(err => {
        console.error(err, err.data);
    });

    viewItem();

};

// 아이템 삭제
// 구현 예정

$appenderForm.addEventListener('submit', addItem);

viewItem(); // 아이템 조회 실행