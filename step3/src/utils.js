export const selectOne = (el, parent = document) => parent.querySelector(el);
export const selectAll = (el, parent = document) => parent.querySelectorAll(el);
export function checklength(item) {
    if (item.length === 0) {
      return alert("아이템 내용을 입력해주세요");
    } else {}
  }

