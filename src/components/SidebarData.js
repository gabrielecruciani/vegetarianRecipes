import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons5 from "react-icons/io5";



export const SiderbarData = [
    {
        title: 'Login',
        path: '/login',
        icon: <IoIcons5.IoLogInOutline />,
        cName: 'nav-text'
    },
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Favourites',
        path: '/favourites',
        icon: <FaIcons.FaRegStar />,
        cName: 'nav-text'
    },
    {
        title: 'Contacts',
        path: '/contacts',
        icon: <AiIcons.AiOutlineInfoCircle />,
        cName: 'nav-text'
    }
];