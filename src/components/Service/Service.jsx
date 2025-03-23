import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import Login_main from '../Login/Login_main';
import { AuthContext } from "../../chat/src/context/AuthContext";
import { useContext } from 'react';
import { useEffect, Navigate } from 'react';
const Service = () => {
const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Login_main />
  }
  return (
    <>
      <Navbar />
      <div className="bg-primary min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              We offer a wide range of services to meet your farming needs.
            </p>
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Check Weather</h2>
                <p className="text-gray-700">
                  Get real-time weather updates and forecasts for your farming area.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Consult Specialists</h2>
                <p className="text-gray-700">
                  Connect with agricultural specialists to seek expert advice and guidance for your farming practices.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Post Problems</h2>
                <p className="text-gray-700">
                  Share your farming problems and seek solutions from the community of farmers and experts.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Chat With Other Farmers</h2>
                <p className="text-gray-700">
                  Join chat rooms and discussions to interact with fellow farmers, exchange ideas, and share experiences.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Crop Prediction</h2>
                <p className="text-gray-700">
                  Predict and analyze crop yield and growth patterns using advanced algorithms and data analysis techniques.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Advance Farming</h2>
                <p className="text-gray-700">
                  Explore innovative farming practices, techniques, and technologies to optimize your agricultural processes.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Innovative Farming Tools</h2>
                <p className="text-gray-700">
                  Discover and learn about the latest farming tools and equipment to enhance your productivity and efficiency.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Huge Farming Resources</h2>
                <p className="text-gray-700">
                  Access a wide range of farming resources, including articles, guides, and tutorials, to expand your knowledge and skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    <BackToTop />
    </>
  );
};

export default Service;
