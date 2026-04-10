import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Reviews from '../components/Reviews';
import HeroImg from '../assets/images/Hero-img.jpeg';
import Aboutimg from '../assets/images/about2.jpg'
import Chooseimg from '../assets/images/about1.jpg'
import Logo from '../assets/images/logo.jpeg';
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";
import { PiFlowerLotus } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from '../hooks/useTranslation';
import { LiaMountainSolid } from "react-icons/lia";
import './Home.css';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FiArrowUp } from "react-icons/fi";


// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.1,
            ...options
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [options]);

    return [ref, isVisible];
};

function Home() {
    const [activeShilajitTab, setActiveShilajitTab] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [showHeroInfo, setShowHeroInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const heroSectionRef = useRef(null);
    const { t } = useTranslation();

    // Animation refs for scroll animations
    const [heroRef, heroVisible] = useIntersectionObserver();
    const [aboutRef, aboutVisible] = useIntersectionObserver();
    const [shilajitRef, shilajitVisible] = useIntersectionObserver();
    const [certificationRef, certificationVisible] = useIntersectionObserver();
    const [quoteRef, quoteVisible] = useIntersectionObserver();
    const [doctorRef, doctorVisible] = useIntersectionObserver();
    const [faqRef, faqVisible] = useIntersectionObserver();
    const [ctaRef, ctaVisible] = useIntersectionObserver();

    // Loading screen effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Handle scroll for hero image shrinking effect and scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const shilajitContent = [
        {
            id: 0,
            buttonLabel: t('shilajit.pureResin'),
            title: t('shilajit.pureResintitle'),
            text: t('shilajit.pureResinText'),
            image: 'src/assets/images/himalaya-shilajit.jpeg'
        },
        {
            id: 1,
            buttonLabel: t('shilajit.richMinerals'),
            title: t('shilajit.richMineralstitle'),
            text: t('shilajit.richMineralsText'),
            image: Chooseimg
        },
        {
            id: 2,
            buttonLabel: t('shilajit.energyBoost'),
            title: t('shilajit.energyBoosttitle'),
            text: t('shilajit.energyBoostText'),
            image: 'src/assets/images/energy-boost.jpg'
        },
        {
            id: 3,
            buttonLabel: t('shilajit.antiAging'),
            title: t('shilajit.antiAgingtitle'),
            text: t('shilajit.antiAgingText'),
            image: 'src/assets/images/health.jpg'
        }
    ];

    const [activeFAQ, setActiveFAQ] = useState(null);
    const faqs = t('faq.questions');
    const certifications = [
        { name: "Intertek", logo: "src/assets/images/logos/intertek.png" },
        { name: "Bureau Veritas", logo: "src/assets/images/logos/bureau-vritas.jpg" },
        { name: "Eurofins", logo: "src/assets/images/logos/eurofins.png" },
        { name: "PCSIR", logo: "src/assets/images/logos/PCSIR.jpg" },
        { name: "ONSSA", logo: "src/assets/images/logos/onssa.png" },
        { name: "Ministry of Health", logo: "src/assets/images/logos/Ministere-sante-maroc.png" },
        { name: "Agrolab", logo: "src/assets/images/logos/Agrolab.png" },
        { name: "IAS Labs", logo: "src/assets/images/logos/ias.jfif" }
    ];
    return (
        <div className="Home" >
            {/* Loading Screen */}
            {isLoading && (
                <div className="loading-screen">
                    <div className="loading-content">
                        <div className="loading-logo-wrapper">
                            <img src={Logo} alt="Loading" className="loading-logo" />
                        </div>
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            )}

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <FiArrowUp />
                </button>
            )}

            <Header />
            <section className="Hero" ref={heroRef} id="hero">
                <div className={`hero-content ${heroVisible ? 'animate-in' : ''}`}>
                    <h1 className={heroVisible ? 'fade-slide-in-left' : ''}><span>{t('hero.brandName')}</span> <br /> {t('hero.productName')}</h1>
                    <div className={`Hero-text ${heroVisible ? 'fade-slide-in-left-delay' : ''}`}>
                        <p>{t('hero.description')}</p>
                    </div>
                    <div className={`hero-action-btn ${heroVisible ? 'fade-slide-in-left-delay-2' : ''}`}>

                        <a href="#about" className="discover-brand-btn ">
                            {t('hero.discoverBrand')}
                            <FiArrowDownRight className="btn-icon" />
                        </a>
                    </div>
                </div>
                <div
                    className={`hero-image ${heroVisible ? 'fade-slide-in-right' : ''}`}
                    style={{ transform: `scale(${Math.max(1 - scrollY / 2000, 0.9)})` }}
                    onMouseEnter={() => setShowHeroInfo(true)}
                    onMouseLeave={() => setShowHeroInfo(false)}
                >
                    <img src={HeroImg} alt="Doctor Laila" />
                    {showHeroInfo && (
                        <div className="hero-info-card fade-in">
                            <div className="hero-info-content">
                                <h4>{t('hero.pureShilajit')}</h4>
                                <p>{t('hero.shilajitBenefits')}</p>
                            </div>
                        </div>
                    )}
                    {showHeroInfo && (
                        <a href="https://www.greenvillage.ma/produit/biolife-shilajit-himalayan-secret-doctot-laila-30ml" target="_blank" rel="noopener noreferrer" className="hero-order-btn fade-in">
                            {t('hero.orderBtn')}
                            <MdArrowOutward className="order-btn-icon" />
                        </a>
                    )}
                </div>
            </section>

            {/* Certification Slider Section */}
            <section className="certification-section">
                <div className="container">
                    <div className="slider-container">
                        <div className="slider-track">
                            {/* Triple duplicate for seamless infinite scrolling */}
                            {[...certifications, ...certifications, ...certifications].map((cert, index) => (
                                <div key={index} className="cert-item">
                                    <img src={cert.logo} alt={cert.name} title={cert.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="AboutUs" ref={aboutRef} id="about">
                <div className={`about-container ${aboutVisible ? 'animate-in' : ''}`}>
                    {/* Part 1: Why Choose Us */}
                    <div className={`about-part part-one ${aboutVisible ? 'fade-slide-in-left' : ''}`}>
                        <div className="part-image-wrapper">
                            <img src={Chooseimg} alt="Holistic Health" className="about-image" />
                        </div>
                        <div className="why-choose-us-content">
                            <h3 className="why-choose-title">{t('aboutUs.whyChooseUs')}</h3>
                            <div className="features-cards">
                                <div className={`feature-card ${aboutVisible ? 'fade-slide-up-delay-1' : ''}`}>
                                    <div className="card-icon">
                                        <PiFlowerLotus />
                                    </div>
                                    <h4>{t('aboutUs.naturalIngredients')}</h4>
                                    <p>{t('aboutUs.naturalIngredientsDesc')}</p>
                                </div>
                                <div className={`feature-card ${aboutVisible ? 'fade-slide-up-delay-2' : ''}`}>
                                    <div className="card-icon">
                                        <SlEnergy />
                                    </div>
                                    <h4>{t('aboutUs.scientificallyProven')}</h4>
                                    <p>{t('aboutUs.scientificallyProvenDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Part 2: About Us */}
                    <div className={`about-part part-two ${aboutVisible ? 'fade-slide-in-up' : ''}`}>
                        <div className="about-text-content">
                            <p className="about-small-title">{t('aboutUs.aboutSection')}</p>
                            <h2 className="about-main-title">{t('aboutUs.brandTitle')}</h2>
                            <p className="about-paragraph">
                                {t('aboutUs.brandDescription')}
                            </p>
                        </div>
                    </div>

                    {/* Part 3: Image */}
                    <div className={`about-part part-three ${aboutVisible ? 'fade-slide-in-right' : ''}`}>
                        <img src={Aboutimg} alt="Holistic Health Full" className="about-image-full" />
                    </div>
                </div>
            </section>

            <section className="ShilajitSection" ref={shilajitRef} id="shilajit">
                <div className={`shilajit-header ${shilajitVisible ? 'animate-in' : ''}`}>
                    <p className={`shilajit-small-title ${shilajitVisible ? 'fade-in' : ''}`}>{t('shilajit.learnAbout')}</p>
                    <h2 className={`shilajit-main-title ${shilajitVisible ? 'fade-slide-up' : ''}`}>{t('shilajit.blackGold')}</h2>
                    <p className={`shilajit-description ${shilajitVisible ? 'fade-in-delay' : ''}`}>
                        {t('shilajit.description')}
                    </p>
                </div>

                <div className={`shilajit-content-container ${shilajitVisible ? 'animate-in' : ''}`}>
                    {/* Part 1: Buttons */}
                    <div className="shilajit-buttons-part">
                        {shilajitContent.map((item, index) => (
                            <button
                                key={item.id}
                                className={`shilajit-btn ${activeShilajitTab === index ? 'active' : ''}`}
                                onClick={() => setActiveShilajitTab(index)}
                            >
                                {item.buttonLabel}
                            </button>
                        ))}
                    </div>

                    {/* Part 2: Image */}
                    <div className="shilajit-image-part">
                        <img
                            src={shilajitContent[activeShilajitTab].image}
                            alt={shilajitContent[activeShilajitTab].title}
                            className="shilajit-display-image"
                        />
                    </div>

                    {/* Part 3: Text Content */}
                    <div className="shilajit-text-part">
                        <h3 className="shilajit-content-title">
                            {shilajitContent[activeShilajitTab].title}
                        </h3>
                        <p className="shilajit-content-text">
                            {shilajitContent[activeShilajitTab].text}
                        </p>
                    </div>
                </div>
            </section>

            {/* Certification Section */}
            <section className="CertificationSection" ref={certificationRef}>
                <div className={`certification-container ${certificationVisible ? 'animate-in' : ''}`}>
                    {/* Left Content */}
                    <div className="certification-content">
                        <p className={`certification-label ${certificationVisible ? 'fade-in' : ''}`}>{t('certification.subtitle')}</p>
                        <h2 className={`certification-title ${certificationVisible ? 'fade-slide-in-left' : ''}`}>{t('certification.title')}</h2>
                        <p className={`certification-description ${certificationVisible ? 'fade-in-delay' : ''}`}>{t('certification.description')}</p>

                        <div className={`certification-badges ${certificationVisible ? 'animate-in' : ''}`}>
                            <div className={`cert-badge ${certificationVisible ? 'fade-slide-up-delay-1' : ''}`}>
                                <div className="badge-icon">
                                    <img src="src/assets/images/logos/Ministere-sante-maroc.png" alt="Ministry" />
                                </div>
                                <div className="badge-text">
                                    <h4>{t('certification.certificationLabel1')}</h4>
                                    <p>{t('certification.certificationText1')}</p>
                                </div>
                            </div>
                            <div className={`cert-badge ${certificationVisible ? 'fade-slide-up-delay-2' : ''}`}>
                                <div className="badge-icon">
                                    <img src="src/assets/images/logos/onssa.png" alt="ONSSA" />
                                </div>
                                <div className="badge-text">
                                    <h4>{t('certification.certificationLabel2')}</h4>
                                    <p>{t('certification.certificationText2')}</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Right Image */}
                    <div className="certification-image">

                        <img src="https://i.ibb.co/Z1g1wSfv/Certificate-1-1.png" alt="Morocco Health Ministry" className="cert-img ministry" />

                    </div>
                </div>
            </section>

            <section className="DoctorLailaSection" ref={doctorRef}>
                <div className={`doctor-laila-container ${doctorVisible ? 'animate-in' : ''}`}>

                    <div className={`doctor-laila-content ${doctorVisible ? 'fade-slide-in-left' : ''}`}>
                        <h2 className="doctor-laila-title">{t('doctorSection.title')}</h2>
                        <p className="doctor-laila-paragraph">
                            {t('doctorSection.description')}
                        </p>
                    </div>
                    <div className={`doctor-laila-image ${doctorVisible ? 'fade-slide-in-right' : ''}`}>
                        <img src='https://i.ibb.co/KcTzskYL/DSC-4849.jpg' alt="Doctor Laila" className="doctor-image" />
                    </div>
                </div>
            </section>
            {/*Reviews component */}
            <Reviews />

            <section className="FAQSection" ref={faqRef} id="faq">
                <h2 className={faqVisible ? 'fade-slide-down' : ''}>{t('faq.title')}</h2>

                <div className={`faq-container ${faqVisible ? 'animate-in' : ''}`}>
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeFAQ === index ? "open" : ""}`}
                            onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                        >
                            <div className="faq-question">
                                <h4>{item.q}</h4>
                                <span>{activeFAQ === index ? "-" : "+"}</span>
                            </div>
                            {activeFAQ === index && (
                                <p className="faq-answer">{item.a}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="CTASection" ref={ctaRef}>
                <h2 className={ctaVisible ? 'fade-slide-up' : ''}>{t('cta.title')}</h2>
                <p className={ctaVisible ? 'fade-slide-up-delay-1' : ''}>{t('cta.description')}</p>
                <a href='https://www.greenvillage.ma/produit/biolife-shilajit-himalayan-secret-doctot-laila-30ml' target='_blank' rel='noopener noreferrer' className={` CTA-btn ${ctaVisible ? 'fade-slide-up-delay-2 hover-lift' : ''}`}>
                    {t('cta.button')}
                    <MdArrowOutward className="btn-icon" />
                </a>
            </section>
            <section className="SupportSection" id="support">
                <h2>{t('support.title')}</h2>
                <p>{t('support.description')}</p>
                <button onClick={() => window.open('https://wa.me/+31625375673', '_blank')}>
                    <TfiHeadphoneAlt style={{ marginRight: '10px' }} />
                    {t('support.button')}
                </button>
            </section>


            <footer className="Footer">

                {/* Floating Logo */}
                <div className="footer-logo">
                    <div className="logo-circle">
                        <img src={Logo} alt="Doctor Laila Logo" />
                    </div>
                </div>

                <div className="footer-container">

                    {/* Column 1 */}
                    <div className="footer-col">
                        <h3 className='footer-logo-text'>{t('footer.brandName')}</h3>
                        <p>
                            {t('footer.brandDesc')}
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="footer-col">
                        <h4>{t('footer.quickLinks')}</h4>
                        <ul>
                            <li><Link to="/">{t('footer.home')}</Link></li>
                            <li><a href="#about">{t('footer.about')}</a></li>
                            <li><a href="https://www.greenvillage.ma/produit/biolife-shilajit-himalayan-secret-doctot-laila-30ml">{t('footer.shop')}</a></li>

                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="footer-col">
                        <h4>{t('footer.support')}</h4>
                        <ul>
                            <li><a href="#faq">{t('footer.faq')}</a></li>
                            <li><a href="#contact">{t('footer.contact')}</a></li>
                            <li><a href="#privacy">{t('footer.privacyPolicy')}</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div className="footer-col newsletter">
                        <h4>{t('footer.stayUpdated')}</h4>
                        <p>{t('footer.stayUpdatedDesc')}</p>

                        <div className="social-icons">
                            <a href='https://www.instagram.com/doctorlaila_labs' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
                            <a href='https://www.facebook.com/profile.php?id=61580742563135' target='_blank' rel='noopener noreferrer'><FaFacebookF /></a>
                            <a href='https://www.linkedin.com/company/holistichealthacademy' target='_blank' rel='noopener noreferrer'><FaLinkedinIn /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>{t('footer.copyright')}</p>
                </div>

            </footer>
        </div>
    );
}

export default Home;