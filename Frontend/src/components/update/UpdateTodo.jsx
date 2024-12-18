import { useEffect, useState } from "react";
import { retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate, useParams } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

const UpdateTodo = () => {
    const { id } = useParams();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [done, setDone] = useState(false);

    const authContext = useAuth();
    const token = authContext.token;
    const navigate = useNavigate();
    const username = authContext.username;

    useEffect(() => {
        retrieveTodos();
    }, [id]);

    function retrieveTodos() {
        if (id !== -1) {
            retrieveTodoApi(username, id, token)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                    setDone(response.data.done);
                })
                .catch(error => console.log(error));
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: done
        };

        updateTodoApi(username, id, todo, token)
            .then(() => {
                navigate('/todolist');
            })
            .catch(error => console.log(error));
    }

    function toggleDoneStatus() {
        const todo = {
            id: id,
            username: username,
            description: description,
            targetDate: targetDate,
            done: !done
        };

        updateTodoApi(username, id, todo, token)
            .then(() => {
                setDone(!done);
            })
            .catch(error => console.log(error));
    }

    function validate(values) {
        let errors = {};

        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters';
        }

        if (!values.targetDate || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date';
        }

        return errors;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg rounded-lg mt-8">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Update Todo Details</h1>

            <Formik
                initialValues={{ description, targetDate }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {() => (
                    <Form>
                        <div className="mb-6">
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="text-red-500 text-sm mb-2"
                            />
                            <label className="block text-gray-700 font-semibold mb-2">Description</label>
                            <Field
                                type="text"
                                name="description"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter a description"
                            />
                        </div>

                        <div className="mb-6">
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="text-red-500 text-sm mb-2"
                            />
                            <label className="block text-gray-700 font-semibold mb-2">Target Date</label>
                            <Field
                                type="date"
                                name="targetDate"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className={`text-sm font-semibold ${done ? 'text-green-600' : 'text-red-600'}`}>{done ? 'Task Completed' : 'Task Pending'}</span>
                            <button
                                type="button"
                                onClick={toggleDoneStatus}
                                className={`px-4 py-2 rounded-lg shadow-md font-semibold transition duration-200 ${done ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                            >
                                Mark as {done ? 'Incomplete' : 'Complete'}
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-purple-500 text-white font-bold py-2 px-8 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateTodo;
