
import { LuBookMinus } from "react-icons/lu";
import { FaRegListAlt, FaRegUserCircle } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { MdOutlineDashboard, MdOutlineCastConnected, MdOutlineManageAccounts, MdOutlineSettings } from "react-icons/md";
import { PiFlyingSaucerBold } from "react-icons/pi";
import { GrGrow } from "react-icons/gr";

export const accountTabItems = [
    { id: 1, label: 'Activities', icon: FaRegListAlt, link: '/app/activities' },
    { id: 2, label: 'Collectibles', icon: FaRegUserCircle, link: '/app/collectibles' },
    { id: 3, label: 'Protocol Informations', icon: LuBookMinus, link: '/app/protocol-information' },
];

export const menuItems = [
    { id: 1, label: 'Overview', icon: MdOutlineDashboard, link: '/app/overview' },
    { id: 3, label: 'Bridge', icon: PiFlyingSaucerBold, link: '/app/bridge' },
    { id: 2, label: 'Collectibles', icon: GrGrow, link: '/app/collectibles' },
    { id: 4, label: 'Governance', icon: MdOutlineManageAccounts, link: '/app/governance' }
  ];