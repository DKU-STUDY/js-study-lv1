import {appendItem, removeItem,toggleItem,editItem} from "./App";



//1.DOM접근
var $appenderForm = document.forms.appenderForm;
var $todoList = document.querySelector('#todoList');

//2.이벤트등록
$appenderForm.onsubmit=appendItem;
$todoList.querySelectorAll('.remove').forEach(//모든 class="remove"에 대하여 각각
function($remove){       
    $remove.onclick = removeItem;//클릭하면 삭제
    
}
)

$todoList.querySelectorAll('.complete').forEach(
function($complete){       
    $complete.onclick = toggleItem;
}
)

$todoList.querySelectorAll('.update').forEach(
function($update){       
    $update.onclick = editItem;
}
)



