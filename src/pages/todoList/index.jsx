import { View, Input, Text, Button, Picker } from "@tarojs/components";
import Todo from "../../components/todo";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTodoList, addTodo } from "../../actions/todo";

const typeList = ["default", "category", "priority"];
const priorityList = ["normal", "important", "urgent"];
const categoryList = ["work", "study", "life", "normal"];

const Index = ({ todoList, getTodoList, addTodo }) => {
  const [sortType, setSortType] = useState("default");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  useLoad(() => {
    console.log("Page loaded.");
  });

  const onAddTodo = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <View className="page">
      <View className="add-todo">
        <Input
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        ></Input>
        <View className="icon-button">
          <Button onClick={onAddTodo} color="primary">
            ADD
          </Button>
        </View>
      </View>
      {/* 未完成todo */}
      <View className="todo-list">
        <View className="tab">
          <View className="uncompleted">
            <Text>Uncompleted</Text>
          </View>
          {/* 添加按照文件类型或优先级排序 */}
          <View className="sort-box">
            <Picker
              mode="selector"
              range={["default", "category", "priority"]}
              onChange={(e) => setSortType(typeList[e.detail.value])}
            >
              <Button>Sort：{sortType}</Button>
            </Picker>
          </View>
        </View>
        {todoList &&
          todoList
            .filter((todo) => !todo.completed)
            .sort((a, b) => {
              if (sortType === "default") {
                return 0;
              } else if (sortType === "category") {
                return (
                  categoryList.indexOf(a.category) -
                  categoryList.indexOf(b.category)
                );
              } else if (sortType === "priority") {
                //  定义优先级 urgent > important > normal
                return (
                  priorityList.indexOf(a.priority) -
                  priorityList.indexOf(b.priority)
                );
              }
            })
            .map((todo) => <Todo key={todo.id} todo={todo} />)}
      </View>
      {/* 已完成todo */}
      <View className="todo-list">
        <View className="completed">
          <Text>Completed</Text>
        </View>
        {todoList &&
          todoList
            .filter((todo) => todo.completed)
            .map((todo) => <Todo key={todo.id} todo={todo} />)}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
  };
};

export default connect(mapStateToProps, { getTodoList, addTodo })(Index);
