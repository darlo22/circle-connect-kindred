
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import FeaturedCommunities from '../components/home/FeaturedCommunities';
import CTA from '../components/home/CTA';

const Home: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the '#' character
      const id = location.hash.substring(1);
      
      // Find the element with the matching ID
      const element = document.getElementById(id);
      
      // If found, scroll to it
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FeaturedCommunities />
      <CTA />
    </Layout>
  );
};

export default Home;
