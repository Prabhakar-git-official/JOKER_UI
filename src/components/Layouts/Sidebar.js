import React from 'react';

import LogoCircle from '../../assets/images/logos.png';
//import Jokerlogo from '../../assets/images/Jokercoin.png'
import Jokerlogo from '../../assets/images/headercoins.svg'

function Sidebar() {
    return (
        <div className="side d-none d-xl-block">
            <a href="/">
                <div className="icon"><img src={Jokerlogo} alt="LogoCircle" /></div>
            </a>
            <div className="sliding-text"><span>JɸKER PROTOCOL</span></div>
            {/* <div className="sliding-text"><span><img src={Logo} alt="logo" /></span></div> */}
        </div>
    );
}

export default Sidebar;