import React from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between py-5 md:px-6 bg-gray-800 bottom-0 w-full z-10">
      <div className="footer-socials">
        <span className="flex items-center gap-4 cursor-pointer mt-4 md:mt-0">
          <a href="#" target="_blank" rel="noreferrer">
            <FaLinkedinIn className="icons text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaGithub className="icons text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaInstagram className="icons text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaFacebook className="icons text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FaTwitter className="icons text-white" />
          </a>
        </span>
      </div>
      <div className="text-center text-white font-bold px-3 mt-4 md:mt-0">
        <p className="mb-0">
          &copy; {new Date().getFullYear()}{' '}
          <a className="text-white font-bold" href="#" target="_blank" rel="noreferrer">
            Krishi Samarth
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
