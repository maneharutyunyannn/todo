import { useTodoContext } from '../context/TodoContext';
import SearchTask from './SearchTask';
import React, { useMemo, useDeferredValue } from 'react';

const TodoList: React.FC = () => {
    const { tasks, searchTerm, removeTask, toggleTask } = useTodoContext();
    const deferredSearchTerm = useDeferredValue(searchTerm);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task =>
            task.description.toLowerCase().includes(deferredSearchTerm.toLowerCase())
        );
    }, [tasks, deferredSearchTerm]);

    const activeTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    return (
        <div>
            <SearchTask/>

            <h2 className="text-xl font-bold mt-4">Active Tasks</h2>
            <div className="pl-5 mt-2">
                {activeTasks.length > 0 ? (
                    activeTasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-2">
                            <span
                                onClick={() => toggleTask(task.id)}
                                className="cursor-pointer hover:text-blue-500"
                            >
                                {task.description}
                            </span>
                            <button
                                onClick={() => removeTask(task.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No active tasks</p>
                )}
            </div>

            <h2 className="text-xl font-bold mt-4">Completed Tasks</h2>
            <div className="pl-5 mt-2">
                {completedTasks.length > 0 ? (
                    completedTasks.map((task) => (
                        <div key={task.id} className="flex items-center mb-2">
                            <span
                                onClick={() => toggleTask(task.id)}
                                className="cursor-pointer hover:text-blue-500 line-through"
                            >
                                {task.description}
                            </span>
                            <button
                                onClick={() => removeTask(task.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No completed tasks</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
