import { FormEventHandler, useState } from "react";

type Props = {
  handleAddTodoSubmit: (text: string) => void;
};

const TodoAddForm = ({ handleAddTodoSubmit }: Props) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodoSubmit(text);
        setText("");
      }}
    >
      <input
        type="text"
        placeholder="Add Item"
        name="newTodo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
export { TodoAddForm };
