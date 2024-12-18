import { useEffect, useState } from "react";
import "./todolist.css";
import { deleteTodoApi, retriveAllTodosForUsername, createTodoApi } from "../api/TodoApiService";
import Swal from "sweetalert2";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState({ description: "", targetDate: "" });
    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;

    const token = authContext.token
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        setLoading(true);
        retriveAllTodosForUsername(username, token)
            .then((response) => setTodos(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const handleAddTodo = () => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

        if (!newTodo.description || !newTodo.targetDate) {
            Swal.fire({
                title: "Error!",
                text: "Please fill out all fields before adding a todo.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        if (newTodo.targetDate < today) {
            Swal.fire({
                title: "Error!",
                text: "The target date cannot be in the past.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const todo = {
            username: username,
            description: newTodo.description,
            targetDate: newTodo.targetDate,
            done: false,
        };

        createTodoApi(username, todo)
            .then(() => {
                fetchTodos();
                setNewTodo({ description: "", targetDate: "" });
                Swal.fire({
                    title: "Success!",
                    text: "New todo added successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add a new todo. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            });
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodoApi(username, id, token)
                    .then(() => {
                        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The task has been successfully deleted.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the task. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                        });
                    });
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/todo/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start p-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-700 mb-2">Advanced To-Do List</h1>
                <p className="text-gray-500 text-sm">Manage your tasks efficiently</p>
            </div>

            {/* Add Todo Section */}
            <div className="w-full max-w-4xl mb-8 bg-white shadow-md rounded-xl p-6 flex flex-col items-center neumorphic-card">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Todo</h2>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Enter task description"
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    />
                    <input
                        type="date"
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTodo.targetDate}
                        onChange={(e) => setNewTodo({ ...newTodo, targetDate: e.target.value })}
                    />
                    <button
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                        onClick={handleAddTodo}
                    >
                        Add Todo
                    </button>
                </div>
            </div>

            {/* Todo Table */}
            <div className="w-full max-w-4xl bg-gray-100 shadow-md rounded-xl p-6 neumorphic-card">
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : (
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">S/N</th>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">Description</th>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">Is Done?</th>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">Target Date</th>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">Action Update</th>
                                <th className="p-4 text-gray-700 text-sm font-medium border-b">Action Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo, index) => (
                                <tr key={todo.id} className="hover:bg-gray-50">
                                    {/* Serial Number dynamically calculated */}
                                    <td className="p-4 text-gray-600 text-sm border-b">{index + 1}</td>
                                    <td className="p-4 text-gray-600 text-sm border-b">{todo.description}</td>
                                    <td className="p-4 text-gray-600 text-sm border-b">
                                        {todo.done ? (
                                            <span className="text-green-500 font-semibold">✔</span>
                                        ) : (
                                            <span className="text-red-500 font-semibold">✘</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm border-b">{todo.targetDate}</td>
                                    <td className="p-4 text-gray-600 text-sm border-b">
                                        <button
                                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                                            onClick={() => handleUpdate(todo.id)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="p-4 text-center border-b">
                                        <button
                                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                                            onClick={() => handleDelete(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
};

export default TodoList;
