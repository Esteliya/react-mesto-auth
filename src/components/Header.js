//import React from 'react';
import headerLogo from '../images/logo-mesto.svg';//лого Место

//прописать пропсы с заменой ссылки!!!

function Header(props) {
    const {name, link} = props;
    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
                <nav className='header__menu'>
                <a className="header__link" href={link}>{name}</a>
                </nav>
        </header>
    )
}
export default Header;