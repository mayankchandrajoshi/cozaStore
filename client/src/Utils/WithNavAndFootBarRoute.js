import React from 'react';
import MainNavBar from "../Components/NavBar/MainNavBar";
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

export default () => {
  return (
    <>
      <MainNavBar />
      <Outlet />
      <Footer />
    </>
  );
};
