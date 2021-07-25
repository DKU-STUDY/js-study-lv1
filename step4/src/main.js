const itemTemplate = ({id, content, highlight, isComplete, selected}) => `
        <li>
            ${selected == true ? `
                <form name="modifierForm" action="" id="${id}">
                    <fieldset>
                        <legend hidden>아이템 수정</legend>
                        <label>
                            <span hidden>아이템 수정</span>
                            <input type="text" value="${content}" size="40">
                        </label>
                            <button type="submit">완료</button>
                            <button type="button" class="cancel">취소</button>
                    </fieldset>
                </form>   
        `   :   `
                <p ${highlight ? 'style="color:#09F"' : ''} ${isComplete ? 'class="finish"' : ''}>
                    <input type="checkbox" id="${id}" ${highlight ? ' checked' : ''}>
                    ${content}
                </p>
                <button type="button" class="complete" id="${id}">완료</button>
                <button type="button" class="modify" id="${id}">수정</button>
                <button type="button" class="delete" id="${id}">삭제</button>
            `}
        </li>
    `;

const template = (itemList) => `
    <h1>📃 TodoList</h1>
        <form name="appenderForm" action="" method="post">
          <fieldset>
            <legend hidden>TodoList Form</legend>
            <label>
              <span hidden>아이템 추가</span>
              <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
            </label>
            <button type="submit">전송</button>
          </fieldset>
        </form>
    <ul>
        ${itemList !== undefined ? itemList.map(itemTemplate).join('') : ''}
    </ul>
  `;

const fetchAPI = async (url, method, body) => {
    return await fetch(url, {
        method,
        headers : {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(body),
    });
}

// modifyItem에서 이벤트 등록을 위해 async, await 키워드 사용
const render = async function() {
    const $app = document.querySelector('#app');

    await fetchAPI('/api/items', 'GET')
        .then(response => response.json())
        .then(itemList => {
            $app.innerHTML = template(itemList);
            setBtnHandler();
        });
};

const addItem = function(event) {
    event.preventDefault();

    const $inputInfo = this.querySelector('input');
    const value = $inputInfo.value.trim();

    if(value.length === 0) {
        $inputInfo.value = "";
        return alert('아이템 이름을 입력해주세요!');
    }

    fetchAPI('/api/items', 'POST', {
        content: $inputInfo.value,
        highlight: false,
        isComplete: false,
        selected: false,
    }).then(render);
};

const deleteItem = function(event) {
    const delBtn = event.target;

    fetchAPI('/api/items', 'DELETE', {
        id: delBtn.id,
    }).then(render);
};

const modifyItem = function(event) {
    const modBtn = event.target;

    fetchAPI('/api/items/' + modBtn.id, 'PUT')
        .then(() => {
            render()
                .then(() => {
                    const $modifierForm = document.querySelector('form[name="modifierForm"]');
                    $modifierForm.addEventListener('submit', updateItem.bind($modifierForm));

                    const $cancelBtn = $modifierForm.querySelector('.cancel');
                    $cancelBtn.addEventListener('click', cancelModifyItem.bind(null, modBtn.id));

                    $modifierForm.onkeydown = function(event) {
                        if(event.keyCode == 27) {
                            cancelModifyItem(modBtn.id);
                        }
                    }
                })
        });
};

const updateItem = function(event) {
    event.preventDefault();

    const $inputInfo = this.querySelector('input');
    const value = $inputInfo.value.trim();

    if(value.length === 0) {
        $inputInfo.value = "";
        return alert('아이템 이름을 입력해주세요!');
    }

    fetchAPI('/api/items', 'PUT', {
        id: this.id,
        content: value,
    }).then(() => cancelModifyItem(this.id));
}

const cancelModifyItem = function(id) {
    fetchAPI('/api/items/' + id, 'PUT')
        .then(render);
}

const completeItem = function(event) {
    const btn = event.target;

    fetchAPI('/api/items/complete/' + btn.id, 'PUT')
        .then(render);
}

const toggleItem = function(event) {
    const box = event.target;

    fetchAPI('/api/items/toggle/' + box.id, 'PUT')
        .then(render);
}

function setBtnHandler() {
    const $appenderForm = document.querySelector('form[name="appenderForm"]');
    const $delete = document.querySelectorAll('.delete');
    const $modify = document.querySelectorAll('.modify');
    const $complete = document.querySelectorAll('.complete');
    const $toggle = document.querySelectorAll('input[type="checkbox"]');

    $appenderForm.addEventListener('submit', addItem.bind($appenderForm));

    $delete.forEach(function(btn) {
        btn.addEventListener('click', deleteItem);
    });

    $modify.forEach(function(btn) {
        btn.addEventListener('click', modifyItem);
    });

    $complete.forEach(function(btn) {
        btn.addEventListener('click', completeItem);
    })

    $toggle.forEach(function(box) {
        box.addEventListener('change', toggleItem);
    })
};

function main() {
    render();
}

main();