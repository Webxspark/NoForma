const AboutUs = () => {
    return (
        <div className="bg-gradient-to-b from-white to-blue-50 py-16">
            <div className="container mx-auto px-4 min-h-[82vh]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">About Us</h1>
                    <p className="text-xl text-center text-blue-600 mb-12">Transforming client experiences through AI innovation</p>

                    <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            We are a team of innovators passionate about redefining how businesses connect with their clients.
                            Our mission is to simplify and personalize the client onboarding experience using the power of AI,
                            voice, and video.
                        </p>

                        <div className="bg-blue-50 border-l-6 border-blue-500 pl-6 py-4 rounded-r-lg my-10">
                            <p className="text-2xl italic text-gray-700">
                                "Our mission is to create onboarding experiences that feel more human—powered
                                by AI that listens, understands, and delivers."
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-2xl mb-4 text-gray-800">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become the leading AI onboarding platform across industries—offering natural,
                                voice-driven client interactions that are efficient, intelligent, and delightful.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-2xl mb-4 text-gray-800">Our Values</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Innovation, empathy, accessibility, and trust.
                                We believe technology should adapt to people—not the other way around.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;