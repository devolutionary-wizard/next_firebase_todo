"use client";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import Todo from "@/components/Todo";
import { db } from "@/firebase";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";

interface TodoType {
  todo: string;
  isCompleted: boolean;
}

export default function Home(): React.JSX.Element {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<TodoType[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = (e: any) => {
    const result = todos.filter((todo) => {
      if (e.target.value == "") {
        setIsSearch(false);
        return;
      }
      setIsSearch(true);
      return todo.todo.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchQuery(result);
  };

  const createTodo = async (e: any): Promise<void> => {
    let checkValid;
    setIsCreate(true);
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      setIsCreate(false);
      return;
    }

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo.toLowerCase().includes(input.toLowerCase())) {
        checkValid = true;
      }
    }

    if (checkValid) {
      alert("Todo already have!, You can add input new one");
      setIsCreate(false);
    } else {
      await addDoc(collection(db, "todos"), {
        todo: input,
        isCompleted: false,
      }).then((res) => setIsCreate(false));
    }

    setInput("");
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodos = () => {
    const q = query(collection(db, "todos"));
    const data = onSnapshot(q, (querySnapshot): void => {
      let todosArr: any = [];
      querySnapshot.forEach((doc): void => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTimeout((): void => {
        setIsLoading(false);
      }, 2000);
      setTodos(todosArr);
    });
    return () => data();
  };

  const toggleComplete = async (todo: any): Promise<void> => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };

  const deleteTodo = async (id: any): Promise<void> => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center p-4 bg-gradient-to-r from-[#101111] to-[#1CB5E0]">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 p-2 mb-5">
          Todo App
        </h3>
        <div className="mb-3 ">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              onChange={handleSearch}
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            <button
              className="relative z-[2] flex items-center rounded-r bg-slate-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light">
              <AiOutlineSearch />
            </button>
          </div>
        </div>
        <form onSubmit={createTodo} className="flex justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 w-full text-xl"
            type="text"
            placeholder="Add Todo"
          />
          <button className="border p-4 ml-2 bg-purple-500 text-slate-100">
            {isCreate ? (
              <div role="status" className="text-center">
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
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <AiOutlinePlus size={30} />
            )}
          </button>
        </form>
        <ul>
          {isLoading ? (
            <Loading />
          ) : todos.length == 0 || (isSearch && searchQuery.length == 0) ? (
            <Empty />
          ) : isSearch ? (
            searchQuery.map((e, index) => (
              <Todo
                key={index}
                todo={e}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            todos.map((todo: TodoType, index: number) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </ul>
        {todos.length < 1 ? null : (
          <p className="text-center p-2">{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}
