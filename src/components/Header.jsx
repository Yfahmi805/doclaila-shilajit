import React, { useState } from 'react'
import Logo from '../assets/images/logo.jpeg';
import { Link } from 'react-router-dom';
import { MdLanguage } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import './Header.css'

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const languages = [
        { code: 'en', label: t('header.english') },
        { code: 'fr', label: t('header.french') },
        { code: 'ar', label: t('header.arabic') }
    ];

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsLanguageDropdownOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === language);

    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    return (
        <header>
            <div className="header-left">
                <button
                    className="hamburger-btn"
                    onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isSideMenuOpen ? <MdClose /> : <HiOutlineMenuAlt2 />}
                </button>
            </div>

            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>

            <nav className="nav-links">
                <Link to="/">{t('header.home')}</Link>
                <a href="#about">{t('header.about')}</a>
                <a href="#shilajit">{t('header.contact')}</a>
                <a href="#contact">{t('header.blog')}</a>
                <a href="#faq">{t('header.shop')}</a>
            </nav>

            <div className="action-btns">
                <div className="languages-changing">
                    <MdLanguage className='language-icon' />
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="language-btn"
                    >
                        {currentLanguage?.label}
                    </button>
                    <IoIosArrowDown
                        className={`arrow-icon ${isDropdownOpen ? 'open' : ''}`}
                    />

                    {isDropdownOpen && (
                        <div className="language-dropdown">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                                    onClick={() => handleLanguageChange(lang.code)}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className='order-now-btn' onClick={() => window.open('https://www.greenvillage.ma/produit/biolife-shilajit-himalayan-secret-doctot-laila-30ml', '_blank')}>
                    {t('header.orderNow')}
                    <MdArrowForward className='order-icon' />
                </button>
            </div>

            {/* Side Menu */}
            {isSideMenuOpen && (
                <div className="side-menu-overlay" onClick={closeSideMenu}></div>
            )}
            <div className={`side-menu ${isSideMenuOpen ? 'open' : ''}`}>
                <nav className="side-nav-links">
                    <Link to="/" onClick={closeSideMenu}>{t('header.home')}</Link>
                    <a href="#about" onClick={closeSideMenu}>{t('header.about')}</a>
                    <a href="#shilajit" onClick={closeSideMenu}>{t('header.contact')}</a>
                    <a href="#contact" onClick={closeSideMenu}>{t('header.blog')}</a>
                    <a href="#faq" onClick={closeSideMenu}>{t('header.shop')}</a>
                </nav>

                <div className="side-menu-divider"></div>

                <div className="side-language-section">
                    <button
                        className="side-language-toggle"
                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    >
                        <MdLanguage className="side-language-icon" />
                        <span>{currentLanguage?.label}</span>
                        <IoIosArrowDown className={`side-arrow ${isLanguageDropdownOpen ? 'open' : ''}`} />
                    </button>

                    {isLanguageDropdownOpen && (
                        <div className="side-language-dropdown">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    className={`side-language-option ${language === lang.code ? 'active' : ''}`}
                                    onClick={() => {
                                        handleLanguageChange(lang.code);
                                        setIsLanguageDropdownOpen(false);
                                    }}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;