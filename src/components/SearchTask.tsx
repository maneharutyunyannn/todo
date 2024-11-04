import React from 'react';
import { useTodoContext } from '../context/TodoContext';

const SearchTask: React.FC = () => {
    const { searchTerm, setSearchTerm } = useTodoContext();

    return (
        <input
            type="text"
            placeholder="Search..." className="border border-gray-300 rounded py-2 px-4 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default SearchTask;
