import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as RiIcons from "react-icons/ri";



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
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Favourite',
        path: '/favourite',
        icon: <FaIcons.FaRegStar />,
        cName: 'nav-text'
    },
    {
        title: 'Quick Recipes',
        path: '/quickRecipes',
        icon: <RiIcons.RiTimerFlashLine />,
        cName: 'nav-text'
    }
];