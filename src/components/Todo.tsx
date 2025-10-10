import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const STORAGE_KEY = "todos";

type TodoType = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const Todo = () => {
  const [inputTodo, setInputTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoCount, setTodoCount] = useState<number>(todos.length);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      [...prev]
        .map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
        .sort((a, b) =>
          a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
        )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (inputTodo.trim() === "") {
      alert("Empty Todo");
      return;
    }
    const todoObj: TodoType = {
      id: todoCount + 1,
      name: inputTodo,
      isCompleted: false,
    };

    setTodos((prev) =>
      [...prev, todoObj].sort((a, b) =>
        a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
      )
    );
    setInputTodo("");
    setTodoCount((prev) => prev + 1);
  };

  const deleteTodo = (_todo: TodoType) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== _todo.id));
  };

  return (
    <div className="w-full sm:w-1/2 flex flex-col items-center bg-background-light/10 border border-border rounded-xl p-2 backdrop-blur-3xl">
      <h1 className="text-lg sm:text-2xl lg:text-4xl font-semibold mb-4">
        Todo
      </h1>

      <div className="w-full p-1 mb-2 border-b border-border-muted flex items-center gap-2">
        <input
          type="text"
          className="flex-1 outline-none px-2"
          placeholder="Add Todo..."
          value={inputTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputTodo(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo} className="cursor-pointer">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full h-96 max-h-96 overflow-y-auto p-2 flex flex-col gap-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="w-full flex items-center justify-between p-2 rounded-md border border-border-muted"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                className="cursor-pointer"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
              />
              <label htmlFor={`todo-${todo.id}`} className="cursor-pointer">
                {todo.name}
              </label>
            </div>
            <button className="cursor-pointer">
              <Trash2 onClick={() => deleteTodo(todo)} className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
