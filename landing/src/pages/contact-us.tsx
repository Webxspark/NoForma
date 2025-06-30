import { ShimmerButton } from "../components/magicui/shimmer-button.tsx";



const ContactUs = () => {
    return (
        <div className="bg-gradient-to-b from-white to-blue-50 py-16">
            <div className="container mx-auto px-4 min-h-[82vh]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-4 text-gray-800">Contact Us</h1>
                    <p className="text-xl text-center text-blue-600 mb-12">We'd love to hear from you</p>

                    <div className="grid md:grid-cols-5 gap-8">
                        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Get In Touch</h3>
                            <p className="text-gray-600 mb-8">
                                Have questions about our AI onboarding platform? Reach out to our team and we'll get back to you shortly.
                            </p>

                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-800">info@noforma.com</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-800">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>


                        <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
                            <form>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Your Name</label>
                                        <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Your Email</label>
                                        <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">Subject</label>
                                    <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">Message</label>
                                    <textarea id="message" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                                </div>
                                <ShimmerButton className={"py-3 w-full"}>Contact Us</ShimmerButton>
                            </form>
                            {/*<BorderBeam duration={8} size={100} />*/}
                        </div>
                        {/*<div>*/}
                        {/*    <div className="relative h-[500px] w-full overflow-hidden">*/}
                        {/*        <BorderBeam />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;