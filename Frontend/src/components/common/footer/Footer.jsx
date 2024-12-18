
import "./footer.css"
const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 neumorphic-card">
            <div className="max-w-screen-xl mx-auto px-6 text-center">
                <p className="text-gray-600 text-sm md:text-base">
                    &copy; {new Date().getFullYear()} My Todo App. All rights reserved.
                </p>
                <div className="mt-4">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                    >
                        GitHub
                    </a>{' '}
                    |{' '}
                    <a
                        href="https://www.linkedin.com/in/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                    >
                        LinkedIn
                    </a>{' '}
                    |{' '}
                    <a
                        href="/privacy"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
