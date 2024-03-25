// 编写todo列表子组件，支持删除和完成操作，修改分类（同时修改颜色）、修改优先级、修改截止日期
// 使用src/constants/todo.js中的常量结合redux实现todo列表的增删改查

import React, { useState } from "react";
import { View, Text, Button, Input, Picker } from "@tarojs/components";
import { useDispatch, useSelector } from "react-redux";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  editTodo,
  removeTodo,
  toggleTodo,
  editCategory,
  editPriority,
} from "../../actions/todo";
import { connect } from "react-redux";

import "./index.scss";

const categoryList = ["work", "study", "life", "normal"];
const priorityList = ["normal", "important", "urgent"];

const Todo = ({ todo, onRemove, onToggle, onEditCategory, onEditPriority }) => {
  return (
    <View className={`todo ${todo.completed ? "" : "todo-" + todo.category}`}>
      <View className="todo-header">
        <Text
          className={`todo-text ${todo.completed ? "completed" : ""}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.text}
        </Text>
        <View className="icon-button">
          {/* <Button onClick={() => onEdit(todo.id)}>✏️</Button> */}
          <Button onClick={() => onRemove(todo.id)}>🗑️</Button>
        </View>
      </View>
      <View className="todo-footer">
        <Picker
          className="picker"
          mode="selector"
          range={["work", "study", "life", "normal"]}
          onChange={(e) => {
            console.log("todo: ", e);
            onEditCategory(todo.id, categoryList[e.detail.value]);
          }}
        >
          <Button>{todo.category}</Button>
        </Picker>
        <Picker
          className="picker"
          mode="selector"
          range={["normal", "important", "urgent"]}
          onChange={(e) =>
            onEditPriority(todo.id, priorityList[e.detail.value])
          }
        >
          <Button>{todo.priority}</Button>
        </Picker>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: (id, text) => dispatch(editTodo(id, text)),
    onRemove: (id) => dispatch(removeTodo(id)),
    onToggle: (id) => dispatch(toggleTodo(id)),
    onEditCategory: (id, category) => dispatch(editCategory(id, category)),
    onEditPriority: (id, priority) => dispatch(editPriority(id, priority)),
  };
};

export default connect(null, mapDispatchToProps)(Todo);
