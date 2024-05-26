import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogContent from './components/BlogContent';

const App = () => {
  return (
    <>
      <Header />
      <BlogContent />
      <Footer />
    </>
  );
};

export default App;
