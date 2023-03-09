import type { TodoType } from "./TodoTypes";
import { useState, useEffect } from "react";

type TodoProps = Pick<TodoType, "id" | "checked" | "text"> & {
  handleChecked: (checked: boolean, id: number) => void;
  handleDelete: (id: number) => void;
};

const Todo = ({
  id,
  checked,
  text,
  handleChecked,
  handleDelete,
}: TodoProps) => {
  return (
    <div className="flex">
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleChecked(e.target.checked, id)}
        />
        {text}
      </label>
      <button onClick={() => handleDelete(id)}>❌</button>
    </div>
  );
};

export { Todo };
