import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-4">
      <div className="container">
        Copyright &copy; {new Date().getFullYear()} Dev Connector
      </div>
    </footer>
  );
};
export default Footer;
