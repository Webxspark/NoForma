import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">NoForma.AI</div>
                <div className="flex gap-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;