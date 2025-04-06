import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase/fire';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Render alternative content or loading state
    return null;
  }

  return (
    <div className="navbar">
      <div className="user">
        {currentUser.photoURL && (
          <img src={currentUser.photoURL} alt="Profile Picture" />
        )}
        {currentUser.displayName && (
          <span>{currentUser.displayName}</span>
        )}
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};
export default Navbar;
