import * as types from "../constants/todo";

const INITIAL_STATE = {
  todoList: [],
  filter: "all",
};

export default function todo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_TODO_LIST:
      return {
        ...state,
        todoList: action.todoList,
      };
    case types.ADD_TODO:
      console.log("ADD_TODO." + action.text);
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id:
              state.todoList.reduce(
                (maxId, todo) => Math.max(todo.id, maxId),
                -1
              ) + 1,
            // id: state.todoList.length + 1,
            text: action.text,
            completed: false,
            category: "normal",
            priority: "normal",
          },
        ],
      };
    case types.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.id),
      };
    case types.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case types.CLEAR_COMPLETED:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => !todo.completed),
      };
    case types.EDIT_TODO:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        ),
      };
    case types.EDIT_CATEGORY:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, category: action.category } : todo
        ),
      };
    case types.EDIT_PRIORITY:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, priority: action.priority } : todo
        ),
      };
    case types.EDIT_DEADLINE:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, deadline: action.deadline } : todo
        ),
      };
    default:
      return state;
  }
}
