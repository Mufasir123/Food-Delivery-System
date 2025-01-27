import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import TrendingProducts from '../components/TrendingProducts';
import { useSelector } from 'react-redux';

const HomePage = () => {

  const {user} = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if(!user){
      navigate("/signup")
    }
  }, [])
  
  return (
    <div>
      <Hero />
      <TrendingProducts/>
      <Features />
      <Footer/>
      <Outlet/>
    </div>
  );
};

export default HomePage;
