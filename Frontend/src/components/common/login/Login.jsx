
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../security/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const navigate = useNavigate();
    const authContext = useAuth(); // Access authentication context
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Attempt login
        if (await authContext.login(formData.name, formData.password)) {
            navigate(`/welcome/${formData.name}`); // Redirect on success
        } else {
            setError("Invalid username or password."); // Show error on failure
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="p-8 bg-gray-200 rounded-xl shadow-[8px_8px_15px_#b8b8b8,-8px_-8px_15px_#ffffff] max-w-sm">
                <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 shadow-inner text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 text-sm mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 shadow-inner text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 bg-gray-200 rounded-lg text-gray-700 font-semibold shadow-[8px_8px_15px_#b8b8b8,-8px_-8px_15px_#ffffff] hover:shadow-[inset_8px_8px_15px_#b8b8b8,inset_-8px_-8px_15px_#ffffff] transition-all"
                    >
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Login;
