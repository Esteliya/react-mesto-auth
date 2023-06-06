//import React from 'react';
import headerLogo from '../images/logo-mesto.svg';//лого Место

function Header(props) {
    const { name, link, email, loggedIn } = props;
    
    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
            <nav className='header__menu'>
                {loggedIn ? <p className="header__email">{email}</p> : ''}
                <a className="header__link" href={link}>{name}</a>
            </nav>
        </header>
    )
}
export default Header;