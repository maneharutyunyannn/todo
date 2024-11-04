import React from 'react';
import {TodoProvider} from './context/TodoContext';
import TodoList from './components/TodoList';
import AddTask from "./components/AddTask";

const App: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <TodoProvider>
                <AddTask/>
                <TodoList/>
            </TodoProvider>
        </div>
    );
};

export default App;
