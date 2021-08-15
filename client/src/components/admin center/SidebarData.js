import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from "react-icons/md";
import * as IoIcons from 'react-icons/io';
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
  {
    title: 'Home',
    link: '/adHome',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'About Village',
    link: '/adVillage',
    icon: <GiIcons.GiVillage />,
    cName: 'nav-text'
  },
  {
    title: 'Schemes',
    link: '/adSchemes',
    icon: <MdIcons.MdLocalOffer />,
    cName: 'nav-text'
  },
  {
    title: 'Payment',
    link: '/',
    icon: <MdIcons.MdPayment />,
    cName: 'nav-text'
  },
  {
    title: 'Residence Certificate',
    link: '/adResidence',
    icon: <FaIcons.FaCertificate />,
    cName: 'nav-text'
  },
  {
    title: 'Revenue Tax',
    link: '/adRevenueReceipt',
    icon: <GiIcons.GiMoneyStack />,
    cName: 'nav-text'
  },
  {
    title: 'Villager Database',
    link: '/adVillager',
    icon: <AiIcons.AiFillDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    link: '/adNotify',
    icon: <MdIcons.MdNotificationsActive />,
    cName: 'nav-text'
  }
];