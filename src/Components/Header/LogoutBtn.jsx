import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth_service';
import { logout } from '../../Store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => console.log(error));
  };

  return (
    <button
      className="text-white font-medium text-lg px-4 py-2 rounded-full bg-white/20 hover:bg-white/40 duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
