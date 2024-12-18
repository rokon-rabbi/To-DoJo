import { Link, isRouteErrorResponse } from "react-router";

const ErrorPage = () => {
    const error = null;
    // Retrieve the error details
    const status = isRouteErrorResponse(error) ? error.status : 404; // Determine error status
    const message = isRouteErrorResponse(error)
        ? error.data || error.statusText
        : "An unexpected error occurred.";

    return (
        <div>
            <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <img
                        className="relative mb-20 mix-blend-multiply"
                        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                        alt="Error Animation"
                    />

                    <div className="max-w-md text-center absolute bottom-16">
                        <h2 className="mb-8 font-extrabold text-6xl text-gray-600">
                            <span className="sr-only">Error</span> {status}
                        </h2>
                        <p className="text-sm font-semibold md:text-xl mb-16">
                            {message}
                        </p>
                        <Link
                            to="/"
                            className="px-8 py-3 font-semibold rounded bg-cyan-200 text-gray-900 hover:bg-cyan-300"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
