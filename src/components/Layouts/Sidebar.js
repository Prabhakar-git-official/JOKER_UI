import React from 'react';

import LogoCircle from '../../assets/images/logos.png';
import Jokerlogo from '../../assets/images/JUSD.svg'

function Sidebar() {
    return (
        <div className="side d-none d-xl-block">
            <a href="/">
                <div className="icon"><img src={Jokerlogo} alt="LogoCircle" /></div>
            </a>
            <div className="sliding-text"><span>JOKER</span></div>
            {/* <div className="sliding-text"><span><img src={Logo} alt="logo" /></span></div> */}
        </div>
    );
}

export default Sidebar;