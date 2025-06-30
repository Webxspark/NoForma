import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button.tsx";
import { ShimmerButton } from "../components/magicui/shimmer-button.tsx";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4 py-20 min-h-[82vh] flex items-center justify-center">
                <div className="max-w-3xl text-center">
                    <h1 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">
                        Revolutionizing Client Onboarding with <span className="text-blue-600">AI</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        We replace outdated forms and lengthy onboarding calls with intelligent,
                        conversational AI that makes the process seamless for everyone.
                    </p>
                    <div className="flex gap-4 justify-center items-center">
                        <Link to={"/about"}><InteractiveHoverButton className={"py-3"}>Learn More</InteractiveHoverButton></Link>
                        <Link to={"/contact"}><ShimmerButton className={"py-3"}>Contact Us</ShimmerButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;