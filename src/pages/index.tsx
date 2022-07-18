import type { NextPage } from 'next'
import React, { useState } from 'react'
import ThemeSwitcher from '../styles/components/navbar/ThemeSwitcher'

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<string[]>([])
  const [todo, setTodo] = useState<string>('')

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setTasks((prev) => [...prev, todo])
    setTodo('')
  }

  return (
    <div className="dark:bg-dark h-screen font-poppins">
      <div className="flex flex-col justify-center items-center h-full max-w-5xl mx-auto px-4">
        <ThemeSwitcher />
        <form className="sm:w-2/3 lg:w-1/2 w-full" onSubmit={submitHandler}>
          <div className="px-3 py-2 bg-slate-200 placeholder-slate-500 rounded-xl mb-3">
            <input
              type="text"
              placeholder="Write a new task"
              className="px-2 py-1 bg-transparent focus:ring-transparent border-none form-input w-full"
              maxLength={40}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          {tasks.map((tes, index) => {
            return (
              <div className="px-3 py-2 bg-white placeholder-slate-500 rounded-xl mb-2">
                <input
                  id={`todo${index}`}
                  type="checkbox"
                  className="form-checkbox rounded ml-2 my-2 p-2 peer checked:text-indigo-600 focus:ring-indigo-600 transition duration-300"
                />
                <label
                  className="p-2 peer-checked:line-through decoration-2 decoration-indigo-600"
                  htmlFor={`todo${index}`}
                >
                  {tes}
                </label>
              </div>
            )
          })}
        </form>
      </div>
    </div>
  )
}

export default Home
