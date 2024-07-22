"use client";
import React, { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Asad Ullah Anwar Todo List</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className='bg-black text-white p-5 text-5xl font-bold text-center'>
          Asad Ullah Anwar Todo List
        </header>
        <main className='p-8 bg-slate-200'>
          {children}
        </main>
        <footer className='bg-black text-white p-5 text-center'>
          © {new Date().getFullYear()} Asad Ullah Anwar
        </footer>
      </body>
    </html>
  );
};

const TodoPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && desc.trim()) {
      if (isEditing) {
        const updatedTasks = mainTask.map((task, index) => 
          index === editIndex ? { title, desc } : task
        );
        setMainTask(updatedTasks);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setMainTask([...mainTask, { title, desc, isDone: false }]);
      }
      setTitle("");
      setDesc("");
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const editHandler = (index) => {
    setTitle(mainTask[index].title);
    setDesc(mainTask[index].desc);
    setEditIndex(index);
    setIsEditing(true);
  };

  const markAsDoneHandler = (index) => {
    const updatedTasks = mainTask.map((task, i) => 
      i === index ? { ...task, isDone: !task.isDone } : task
    );
    setMainTask(updatedTasks);
  };

  const renderTasks = mainTask.length > 0 ? (
    mainTask.map((task, index) => (
      <li key={index} className='flex items-center justify-between mb-8'>
        <div className={`flex items-center justify-between mb-5 w-2/3 ${task.isDone ? 'line-through' : ''}`}>
          <h5 className='text-2xl font-semibold'>{task.title}</h5>
          <h6 className='text-lg font-medium'>{task.desc}</h6>
        </div>
        <div>
          <button
            onClick={() => markAsDoneHandler(index)}
            className='bg-green-400 text-white px-4 py-2 rounded font-bold mr-2'>
            {task.isDone ? 'Undo' : 'Done'}
          </button>
          <button
            onClick={() => editHandler(index)}
            className='bg-yellow-400 text-white px-4 py-2 rounded font-bold mr-2'>
            Edit
          </button>
          <button
            onClick={() => deleteHandler(index)}
            className='bg-red-400 text-white px-4 py-2 rounded font-bold'>
            Delete
          </button>
        </div>
      </li>
    ))
  ) : (
    <h2>No Task Available</h2>
  );

  return (
    <>
      <form onSubmit={submitHandler} className='flex flex-col items-center'>
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-5 px-4 py-2'
          placeholder='Enter Title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <input
          type='text'
          className='text-2xl border-zinc-800 border-4 m-5 px-4 py-2'
          placeholder='Enter description here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        
        <button type='submit' className='bg-black text-white text-2xl px-4 py-3 font-bold rounded m-5'>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>
  
      <hr />
  
      <ul>
        {renderTasks}
      </ul>
    </>
  );
};

const Page = () => (
  <Layout>
    <TodoPage />
  </Layout>
);

export default Page;
