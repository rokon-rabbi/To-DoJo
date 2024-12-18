import ErrorPage from "../common/errorPage/ErrorPage";
import Welcome from "../home/Welcome";
import Login from "../common/login/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import TodoList from "../todolist/TodoList";
import Navbar from "../common/header/Navbar";
import Footer from "../common/footer/Footer";
import Logout from "../common/logout/Logout";
import AuthProvider from "../security/AuthContext";
import UpdateTodo from "../update/UpdateTodo";
import WelcomeComponent from "./WelcomeComponent";
import PrivateRoute from "../../routes/PrivateRoute";

const TodoApp = () => {

    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>

                        <Route path="/" element={<Login />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/welcome/:username" element={<PrivateRoute><WelcomeComponent /></PrivateRoute>} />

                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/todolist" element={<PrivateRoute><TodoList /></PrivateRoute>} />
                        <Route path="/todo/:id" element={<PrivateRoute><UpdateTodo /></PrivateRoute>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default TodoApp;