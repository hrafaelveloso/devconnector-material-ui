import React from 'react';
import { Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-4">
      <div className="container">
        <Typography className="text-white">
          Copyright &copy; {new Date().getFullYear()} Dev Connector
        </Typography>
      </div>
    </footer>
  );
};
export default Footer;
