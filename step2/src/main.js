// 코드 작성

// 모듈
import * as appendItemList from "./appendItem";
import editItem from "./editItem";
import removeItem from "./removeItem";
import toggleItem from "./toggleItem";


// 이벤트 등록
appendItemList.$appenderForm.onsubmit = appendItemList.appendItem;

appendItemList.$todoList.querySelectorAll('.remove').forEach(
    function ($remove){
        $remove.onclick = removeItem;
    }
)
appendItemList.$todoList.querySelectorAll('.complete').forEach(
    function ($complete){
        $complete.onclick = toggleItem;
    }
)
appendItemList.$todoList.querySelectorAll('.update').forEach(
    function ($update){
        $update.onclick = editItem;
    }    
)

