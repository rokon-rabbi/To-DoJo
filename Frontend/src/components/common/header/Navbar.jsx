import { useState } from "react";
import { NavLink } from "react-router";
import "./header.css"
import { useAuth } from "../../security/AuthContext";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()


    }
    return (
        <header className="bg-gray-100 py-4  sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-extrabold text-gray-700">
                    <NavLink to="/">
                        My Todo App
                    </NavLink>
                </div>

                {/* Hamburger for Mobile */}
                <button
                    className="lg:hidden text-gray-700 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className={`lg:flex ${isOpen ? "block" : "hidden"}`}>
                    <ul className="flex space-x-6 mx-auto neumorphic-cardx px-8 py-3">
                        <li>{isAuthenticated &&
                            <NavLink
                                to="/"
                                className="text-gray-600 font-medium hover:text-gray-900 transition duration-300"
                            >
                                Home
                            </NavLink>}
                        </li>
                        <li> {isAuthenticated &&
                            <NavLink
                                to="/todolist"
                                className="text-gray-600 font-medium hover:text-gray-900 transition duration-300"
                            >
                                Todo List
                            </NavLink>}
                        </li>
                        <li>{isAuthenticated &&
                            <NavLink
                                to="/about"
                                className="text-gray-600 font-medium hover:text-gray-900 transition duration-300"
                            >
                                About
                            </NavLink>}
                        </li>
                        <li>
                            {isAuthenticated &&
                                <NavLink
                                    to="/contact"
                                    className="text-gray-600 font-medium hover:text-gray-900 transition duration-300"
                                >
                                    Contact
                                </NavLink>}
                        </li>
                    </ul>
                </nav>

                {/* Right Side Profile and Get Started */}
                <div className="hidden lg:flex items-center space-x-4">
                    {isAuthenticated &&
                        <NavLink
                            to="/logout" onClick={logout}
                            className="text-gray-600 font-medium hover:text-gray-900 transition duration-300"
                        >
                            Logout
                        </NavLink>}
                    <NavLink
                        to="/login"
                        className="px-4 py-2 font-semibold rounded bg-cyan-200 text-gray-900 hover:bg-cyan-300 transition duration-300"
                    >
                        Get Started
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
