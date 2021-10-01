import React , { useState }  from 'react'
import UbLogo from '../../assets/uberEatsLogo.png';
import { Link } from 'react-router-dom';
import ReorderIcon from "@material-ui/icons/Reorder";
import './Navbar.css';


function RestaurantNavbarHome() {

    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
      };
    return (
    <div className = "navbar">
        <div className = "leftSide" id={openLinks ? "open" : "close"}>
        <label className="ubLogo"><b>Uber</b></label> <label className="eatsLogo"><b>Eats</b></label> 
            <div className="hiddenLinks">
            <Link to="/menu"> Menu </Link>
            <Link to="/restaurantProfile"> Orders </Link>     
            <Link to="/restaurantProfile">Update Profile </Link> 
            <Link to="/signup"> Signout </Link>
            </div>
        </div>    
        <div className = "rightSide">
            <Link to="/menu"> Menu </Link>
            <Link to="/restaurantProfile"> Orders </Link>
            <Link to="/restaurantProfile"> Update Profile </Link> 
            <Link to="/signup"> SignOut </Link>
        </div>    
    </div>
);
}

export default RestaurantNavbarHome;
