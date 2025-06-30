const Footer = () => {
    return (
        <footer className="bg-black text-white p-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>© {new Date().getFullYear()} NoForma. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;