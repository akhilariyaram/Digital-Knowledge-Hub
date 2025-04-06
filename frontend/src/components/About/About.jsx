import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import About_1 from '../../assets/About_us.jpeg';
const About = () => {
  return (
    <>
    <Navbar />
    <div className="bg-primary min-h-screen overflow-x-hidden"
    style={{backgroundImage: `url(${About_1})`, backgroundSize: 'fit'}}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl text-center">About Us</h1>
        <p className="mt-4 text-lg text-white flex text-center">
        Digital Agriculture Support Platform is a trusted and innovative platform that serves as a dynamic hub for farmers, agricultural experts, and enthusiasts. Our relentless commitment to revolutionizing farming practices drives us to provide an extensive array of resources, advanced tools, and interactive knowledge-sharing platforms. Our primary goal is to empower farmers with comprehensive support, enabling them to make well-informed decisions and embrace sustainable farming practices. By fostering a strong community-driven environment, farmers can effortlessly connect with industry experts, gain access to invaluable insights, and acquire the best practices to optimize their agricultural operations effectively.
        </p>
      </div>
    </div>
    <Footer />
    <BackToTop />
    </>
  );
};

export default About;
