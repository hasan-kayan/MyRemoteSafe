// Navbar.js
import React from 'react';
import { motion } from 'framer-motion';
import './navbar.css';

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">Your Logo</div>
      <motion.ul
        className="nav-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.li
          className="nav-item"
          whileHover={{ backgroundColor: '#555' }}
        >
          Home
        </motion.li>
        <motion.li
          className="nav-item"
          whileHover={{ backgroundColor: '#555' }}
        >
          About
        </motion.li>
        <motion.li
          className="nav-item"
          whileHover={{ backgroundColor: '#555' }}
        >
          Services
        </motion.li>
        <motion.li
          className="nav-item"
          whileHover={{ backgroundColor: '#555' }}
        >
          Contact
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
