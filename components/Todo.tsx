import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import React, { useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, toggleComplete, deleteTodo }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>(todo.todo);

  const editTodo = async (e: any) => {
    setIsLoading(true);
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      setIsLoading(false);
      return;
    }

    const itemRef = doc(db, "todos", todo.id);
    await updateDoc(itemRef, {
      todo: input,
      isCompleted: todo.isCompleted,
    }).then((res) => {
      setShowModal(false);
      setIsLoading(false);
    });
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
              <div className="flex justify-center items-center min-h-screen px-4 py-8">
                <div className="relative  max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-3 sm:flex justify-center">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg text-center font-medium text-gray-800 pb-4">
                        Edit Todo
                      </h4>
                      <form onSubmit={editTodo} className="flex flex-col ">
                        <input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="border p-2 w-full text-xl"
                          type="text"
                        />
                        <div className="pt-5" />
                        <button className=" border rounded-lg p-4 ml-2 bg-purple-500 text-slate-100">
                          {isLoading ? (
                            <div
                              className="flex justify-center items-center"
                              role="status">
                              <svg
                                aria-hidden="true"
                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </div>
                          ) : (
                            <p>Submit</p>
                          )}
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
