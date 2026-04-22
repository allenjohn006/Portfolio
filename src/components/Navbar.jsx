import React from 'react';

export default function Navbar() {
  // Define logoImage - you can replace with your actual logo import
  const logoImage = 'https://via.placeholder.com/50'; // Replace with your logo path

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="navbar">
      <img src={logoImage} alt="Logo" className="logo" onClick={scrollToTop} />
      {/* Add your navbar content here */}
    </nav>
  );
}