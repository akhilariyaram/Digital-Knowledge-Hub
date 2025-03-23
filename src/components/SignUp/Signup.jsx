import React, { useState } from 'react';
import { auth, db, storage } from '../../../firebase/fire';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [err, setErr] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const photo = e.target[4].files[0];

    // Input fields validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    } else if (!email || !password || !confirmPassword || !displayName) {
      setErrorMessage('All fields are required.');
      return;
    } else if (password.length < 6 || confirmPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    } else if (!email.includes('@')) {
      setErrorMessage('Invalid email.');
      return;
    } else if (!photo) {
      setErrorMessage('Please upload a photo');
      return;
    }

    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful');

      // Create a unique image name
      const date = new Date().getTime();
      const photoName = `${displayName}${date}`;

      // Upload profile photo to storage
      const storageRef = ref(storage, `profile-photos/${photoName}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.error('Error uploading photo:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update the user profile with display name and photo URL
          await updateProfile(userCredential.user, {
            displayName,
            photoURL: downloadURL,
          });
          console.log('User profile updated');

          // Save user data to Firestore
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, {
            uid: userCredential.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          console.log('User data saved to Firestore');

          // Save user chats to Firestore
          await setDoc(doc(db, 'userchats', userCredential.user.uid), {});

          setSuccessMessage('Signup successful. Redirecting to Login...');
          setTimeout(() => {
            setSuccessMessage('');
            navigate('/login');
          }, 3000);
        }
      );
    } catch (err) {
      console.error('Signup error:', err.message);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Email is already taken');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePhotoUpload = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md overflow-hidden rounded-md">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Signup Page</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="text"className="text-gray-800 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="text"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-800 font-bold">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${showPassword ? 'visible' : ''
                  }`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-gray-800 font-bold">
              Confirm Password:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${showConfirmPassword ? 'visible' : ''
                  }`}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="text-gray-800 font-bold">
              Profile Photo:
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600"
          >
            Signup
          </button>
          <p className='flex justify-center'>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600 font-bold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
