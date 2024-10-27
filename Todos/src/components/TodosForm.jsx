import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodosForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const onFormSubmit = (e) => {
    e.preventDefault();
    addTodo(todo); // Pass only the text, not an object
    setTodo("");
  };

  return (
    <form onSubmit={onFormSubmit} className="flex">
      <input
        type="text"
        placeholder="enter your todo"
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodosForm;
