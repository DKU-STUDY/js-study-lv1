import { todoList } from "../constants/item";
import { baseHtmlTemplate, processItemsTemplate, editItemTemplate } from "../constants/template";

export const completeHtml = () => {
  const splitBaseHtml = baseHtmlTemplate().split("</ul>");
  const items = todoList.todoItems.map((item) => {
    if (item.status === todoList.status.process) return processItemsTemplate(item);
    if (item.status === todoList.status.edit) return editItemTemplate(item);
  });
  const complete = [splitBaseHtml[0], ...items, splitBaseHtml[1]].join("");
  return complete;
};
