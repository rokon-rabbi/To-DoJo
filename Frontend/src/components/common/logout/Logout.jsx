
import { NavLink } from "react-router";  // Or 'react-router' depending on your version

const Logout = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg w-full text-center neumorphic-card p-8 rounded-xl shadow-lg">
                <h1 className="text-4xl font-extrabold text-gray-700 mb-4">You&#39;re Logged Out!</h1>
                <p className="text-xl font-medium text-gray-500 mb-6">
                    Thank you for using our app. Login to use!
                </p>

                {/* Optionally add an image */}
                <img
                    className="mx-auto w-20 mb-6"
                    src="https://cdn.pixabay.com/photo/2017/05/29/23/02/logging-out-2355227_1280.png"
                    alt="logout image"
                />

                <NavLink
                    to="/"
                    className="px-6 py-3 font-semibold bg-cyan-200 text-gray-900 rounded-lg shadow-md hover:bg-cyan-300 transition duration-300"
                >
                    Go to Login Page
                </NavLink>
            </div>
        </div>
    );
};

export default Logout;
