import * as types from "../constants/todo";

// 定义Todo中可能用到的action类型
// 1. 添加todo
export const addTodo = (text) => {
  return {
    type: types.ADD_TODO,
    text,
  };
};
// 2. 删除todo
export const removeTodo = (id) => {
  return {
    type: types.REMOVE_TODO,
    id,
  };
};
// 3. 切换todo状态
export const toggleTodo = (id) => {
  return {
    type: types.TOGGLE_TODO,
    id,
  };
};
// 4. 修改分类
export const setFilter = (filter) => {
  return {
    type: types.SET_FILTER,
    filter,
  };
};
// 5. 清空已完成
export const clearCompleted = () => {
  return {
    type: types.CLEAR_COMPLETED,
  };
};
// 6. 修改todo内容
export const editTodo = (id, text) => {
  return {
    type: types.EDIT_TODO,
    id,
    text,
  };
};
// 7. 修改todo分类
export const editCategory = (id, category) => {
  return {
    type: types.EDIT_CATEGORY,
    id,
    category,
  };
};
// 8. 修改todo优先级
export const editPriority = (id, priority) => {
  return {
    type: types.EDIT_PRIORITY,
    id,
    priority,
  };
};
// 9. 修改todo截止日期
export const editDeadline = (id, deadline) => {
  return {
    type: types.EDIT_DEADLINE,
    id,
    deadline,
  };
};

// 获取todo列表fetch本地存储
export const getTodoList = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("todo.json");
      const todoList = await response.json();
      console.log(todoList);
      dispatch({
        type: types.GET_TODO_LIST,
        todoList,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
