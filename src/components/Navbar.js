import React, {useState} from 'react';
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SiderbarData } from './SidebarData';
import { IconContext } from 'react-icons';
import lensImage from '../images/lens.png';
import logoImage from '../images/logo.png';
import menuImage from '../images/menu.svg';



function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="logo-container">
          <Link to="/" >
            <img src={logoImage} alt='logo' className='logo'/>
          </Link>
        </div>
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" placeholder='Search' value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">
            <img src={lensImage} alt='lens' className='lens'/>
          </button>
        </form>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
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