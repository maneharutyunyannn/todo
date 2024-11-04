import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const AddTask: React.FC = () => {
    const [description, setDescription] = useState('');
    const { addTask } = useTodoContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim()) {
            addTask(description);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-4">
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded py-2 px-4 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-r py-2 px-4"
            >
                Add task
            </button>
        </form>
    );
};

export default AddTask;
