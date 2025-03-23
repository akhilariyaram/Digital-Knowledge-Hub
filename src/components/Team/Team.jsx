import React from 'react';
import anger6 from '../../assets/anger6.jpeg';
import Ayishik from '../../assets/Ayishik.jpg';
import Snehadrita from '../../assets/Snehadrita.jpg';
import Koustav from '../../assets/Koustav.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    id: 1,
    name: 'B Chandralekha',
    photo: anger6,
    linkedin: 'https://www.linkedin.com/in/soumyajitmondal',
    github: 'https://github.com/soumyajit4419',
  },
  {
    id: 2,
    name: 'Ch Akshara',
    photo: anger6,
    linkedin: 'https://www.linkedin.com/in/ayishik-das',
    github: 'https://github.com/ayishikdas',
  },
  {
    id: 3,
    name: 'A Akhil Sriram',
    photo: anger6,
    linkedin: 'https://www.linkedin.com/in/snehadrita-seth',
    github: 'https://github.com/snehadritaseth',
  },
  {
    id: 4,
    name: 'A Aravind',
    photo: anger6,
    linkedin: 'https://www.linkedin.com/in/koustavchatterjee',
    github: 'https://github.com/koustavchatterjee16',
  },
  // Add more team members as needed
];

const Team = () => {
  return (
    <div className="bg-dark-green py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-6 sm:p-4 hover:shadow-xl transition duration-300 cursor-pointer">
              <img src={member.photo} alt={member.name} className="w-full h-56 object-cover mb-4 rounded-md" />
              <h3 className="flex justify-center text-xl font-semibold text-gray-800">{member.name}</h3>
              <div className="flex justify-center mt-4 space-x-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
