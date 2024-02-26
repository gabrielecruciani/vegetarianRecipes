import React, {useState, useEffect} from 'react';
import { useTheme } from '../ThemeContext';
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as Io5Icons from "react-icons/io5";
import { Link } from 'react-router-dom';
import { SiderbarData } from '../SidebarData';
import { IconContext } from 'react-icons';
import logoImage from '../images/logo.png';
import '../Darkmode.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const showSidebar = () => setSidebar(!sidebar);

  const handleThemeChange = () => {
    toggleTheme();
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const isInsideMenu = e.target.closest('nav-menu');
      const isInsideMenuButton = e.target.closest('.menu-bars');
  
      if (sidebar && !isInsideMenu && !isInsideMenuButton) {
        setSidebar(false);
      }
    };
  
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [sidebar]);

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className='navbar'>
        <Link to="#" className="menu-bars" onClick={showSidebar}>
          <FaIcons.FaBars  />
        </Link>
        <div className="logo-container">
          <Link to="/" >
            <img src={logoImage} alt='logo' className='logo' />
          </Link>
        </div>
        <div className='switch-theme'>
          <input
            type='checkbox'
            id='darkmode-toggle'
            className='dark-theme'
            onChange={handleThemeChange}
            checked={isDarkMode}
          />
          <label htmlFor='darkmode-toggle'>
            <Io5Icons.IoSunny className='sun' />
            <Io5Icons.IoMoon className='moon' />
          </label>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <div className={sidebar ? 'overlay' : ''}></div>
        <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-x ">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SiderbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;