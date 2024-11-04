import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task } from '../types';

const TodoContext = createContext<{
    tasks: Task[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    addTask: (text: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
} | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [taskId, setTaskId] = useState<number>(1);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (description: string) => {
        const newTask: Task = { id: taskId, description, completed: false };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskId((prevId) => prevId + 1);
    };

    const removeTask = useCallback((id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }, []);

    const toggleTask = useCallback((id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    }, []);

    return (
        <TodoContext.Provider value={{ tasks, searchTerm, setSearchTerm, addTask, removeTask, toggleTask }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
