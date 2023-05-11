import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import React, { useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, toggleComplete, deleteTodo }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState<string>(todo.todo);

  const editTodo = async (e: any) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }

    const itemRef = doc(db, "todos", todo.id);
    await updateDoc(itemRef, {
      todo: input,
      isCompleted: false,
    }).then((res) => setShowModal(false));
  };
  return (
    <li
      className={
        todo.isCompleted
          ? "flex justify-between bg-slate-400 p-4 my-2 capitalize"
          : "flex justify-between bg-slate-200 p-4 my-2 capitalize"
      }>
      <div className="flex">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.isCompleted ? true : false}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={
            todo.isCompleted
              ? "ml-2 cursor-pointer line-through"
              : "ml-2 cursor-pointer"
          }>
          {todo.todo}
        </p>
      </div>
      <div className="flex">
        <button type="button" onClick={() => setShowModal(true)}>
          {<FaPencilAlt color="blue" className="mr-5" />}
        </button>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative  max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-3 sm:flex justify-center">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg text-center font-medium text-gray-800 pt">
                        Edit Todo
                      </h4>
                      <form
                        onSubmit={editTodo}
                        className="flex flex-col justify-between">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="border p-2 w-full text-xl"
                          type="text"
                        />
                        <div className="pt-5" />
                        <button className="border p-4 ml-2 bg-purple-500 text-slate-100">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <button onClick={() => deleteTodo(todo.id)}>
          {<FaRegTrashAlt color="red" />}
        </button>
      </div>
    </li>
  );
};

export default Todo;
