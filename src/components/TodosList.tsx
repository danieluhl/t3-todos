import type { TodoType } from "./TodoTypes";
import { Todo } from "./Todo";
import { Heading } from "./Heading";
import { api } from "../utils/api";
import { TodoAddForm } from "./TodoAddForm";
import { todoSort } from "./todoSort";

type TodosListProps = {
  heading: string;
};

const TodosList = ({ heading }: TodosListProps) => {
  const utils = api.useContext();

  const todos = (api.todos.getAll.useQuery().data || []).sort(todoSort);
  const setChecked = api.todos.setChecked.useMutation({
    onMutate: async ({ checked, id }: { checked: boolean; id: number }) => {
      await utils.todos.getAll.cancel();
      utils.todos.getAll.setData(undefined, (prevTodos) => {
        if (prevTodos) {
          const updateTodo = prevTodos.find((todo) => todo.id === id);
          if (updateTodo != null) {
            updateTodo.checked = checked;
          }
          return [...prevTodos];
        }
        return [];
      });
    },
    onSettled: async () => {
      await utils.todos.getAll.invalidate();
    },
  });
  const deleteTodo = api.todos.deleteTodo.useMutation({
    onMutate: async ({ id }: { id: number }) => {
      await utils.todos.getAll.cancel();
      utils.todos.getAll.setData(undefined, (prevTodos) => {
        if (prevTodos) {
          return prevTodos.filter((todo) => todo.id === id);
        }
        return [];
      });
    },
    onSettled: async () => {
      await utils.todos.getAll.invalidate();
    },
  });
  const addTodo = api.todos.addTodo.useMutation({
    onMutate: async ({ text }: { text: string }) => {
      await utils.todos.getAll.cancel();
      utils.todos.getAll.setData(undefined, (prevTodos) => {
        if (prevTodos) {
          return [
            ...prevTodos,
            {
              id: 1,
              text,
              created_at: new Date().toUTCString(),
              checked: false,
              updated_at: null,
            },
          ];
        }
        return [];
      });
    },
    onSettled: async () => {
      await utils.todos.getAll.invalidate();
    },
  });

  const updateTodo = (checked: boolean, id: number) => {
    // call to db to update
    setChecked.mutate({ checked, id });
  };
  const addTodoHandler = (text: string) => {
    addTodo.mutate({ text });
  };
  const deleteTodoHandler = (id) => {
    deleteTodo.mutate({ id });
  };
  return (
    <div>
      <Heading text={heading} />
      <TodoAddForm handleAddTodoSubmit={addTodoHandler} />
      {todos.map((todo) => (
        <Todo
          handleDelete={deleteTodoHandler}
          key={todo.id}
          {...todo}
          handleChecked={updateTodo}
        />
      ))}
    </div>
  );
};

export { TodosList };
