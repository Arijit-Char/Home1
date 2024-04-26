import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import '../App.scss';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Work from '../components/Work';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../layouts/Footer';
import TypingAnimation from '../components/TypingAnimation';
import Testimonials from '../components/Testiminails';

function Home() {
    const [activeLink, setActiveLink] = useState('home');

    const params = useParams();
    const navigate = useNavigate();

    const userId = '65b3a22c01d900e96c4219ae'; // John doe

    const BASE_URL = 'https://portfolio-backend-30mp.onrender.com/api/v1';

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        document.cookie = `portfolio-name=portfolio1`;
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/get/user/${params?.user ?? userId}`);

                const userData = await response.json();

                document.title = `${userData?.user?.about?.name + ' - ' + userData?.user?.about?.title}`;
                setUser(userData?.user);
                setIsLoading(false);
                document.body.classList.remove('loaded');
            } catch (error) {
                navigate('/');
                setIsLoading(true);
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [params?.user, userId, navigate]);

    console.log(user);

    // filtering all the data from the API
    const sortedFilteredSkills = user?.skills?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const sortedFilteredProject = user?.projects?.filter((item) => item.enabled)?.sort((a, b) => a.sequence - b.sequence);
    const filteredServices = user?.services?.filter((item) => item.enabled);
    const filteredTestimonials = user?.testimonials?.filter((item) => item.enabled);
    const filteredSocialHandles = user?.social_handles?.filter((item) => item.enabled);
    const filteredEducation = user?.timeline?.filter((item) => item.forEducation && item.enabled);
    const filteredExperience = user?.timeline?.filter((item) => !item.forEducation && item.enabled);
    const filteredAbout = user?.about;

    const [toggle, setToggle] = useState(false);

    if (filteredAbout === undefined) {
        return <div className="w-full h-screen bg-black flex items-center justify-center text-center">Loading..</div>;
    }

    return (
        <>
            <Fragment>
                <div className="mob-header">
                    <div className="d-flex">
                        <div className="navbar-brand">
                            <a className="logo-text" href="index.html">
                                Tony
                            </a>
                        </div>
                        <button className="toggler-menu" onClick={() => setToggle(!toggle)}>
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>

                <header className={`header-left ${toggle ? 'menu-open menu-open-desk' : ''}`} id="navbar-collapse-toggle">
                    <div className="navbar-brand">
                        <a className="logo-text" href="index.html">
                            {filteredAbout.name}
                        </a>
                    </div>
                    <ul className="nav nav-ul">
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                                to="home"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('home')}
                            >
                                <i className="fas fa-house-damage" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('about')}
                            >
                                <i className="far fa-address-card" />
                                <span>About Me</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'services' ? 'active' : ''}`}
                                to="services"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('services')}
                            >
                                <i className="fas fa-concierge-bell" />
                                <span>Services</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'work' ? 'active' : ''}`}
                                to="work"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('work')}
                            >
                                <i className="fas fa-briefcase" />
                                <span>Portfolio</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'blog' ? 'active' : ''}`}
                                to="blog"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('blog')}
                            >
                                <i className="fas fa-blog" />
                                <span>Blog</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                                to="contactus"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                onClick={() => setActiveLink('contact')}
                            >
                                <i className="fas fa-id-card-alt" />
                                <span>Contact</span>
                            </Link>
                        </li>
                    </ul>
                </header>

                <main className="main-left">
                    {/* Home Banner */}
                    <section
                        id="home"
                        className="home-banner-01 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(static/img/home-banner.jpg)' }}
                    >
                        <div className="container">
                            <div className="row full-screen align-items-center p-100px-tb">
                                <div className="col-md-6">
                                    <div className="ht-text">
                                        <h6>Hello there...</h6>
                                        <h1>{filteredAbout.name}</h1>
                                        <h2>
                                            I Am Passionate &nbsp;
                                            <TypingAnimation about={filteredAbout} />
                                        </h2>
                                        <p>{filteredAbout.quote}</p>
                                        <div className="btn-bar go-to">
                                            <Link
                                                className={`nav-link ${activeLink === 'work' ? 'active' : ''} m-btn m-btn-theme`}
                                                to="work1"
                                                onClick={() => setActiveLink('work')}
                                            >
                                                my work
                                            </Link>
                                            <Link
                                                className={`nav-link ${activeLink === 'contact' ? 'active' : ''} m-btn m-btn-t-theme`}
                                                to="footer"
                                                onClick={() => setActiveLink('contact')}
                                            >
                                                Hire Me
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="go-to go-to-next">
                            <Link to="about">
                                <span />
                            </Link>
                        </div>
                    </section>
                    {/* End Home Banner */}

                    {/* End Home Banner */}
                    {/* about us */}
                    <About about={filteredAbout} social={filteredSocialHandles} />
                    {/* end about us */}
                    {/* fun */}
                    <Skills skills={sortedFilteredSkills} />
                    {/* End fun */}
                    {/* resume */}
                    <Services services={filteredServices} about={filteredAbout} />
                    {/* End resume */}
                    {/* Work */}

                    <Work work={sortedFilteredProject} about={filteredAbout} />
                    {/* End work */}
                    {/* Testimonials */}
                    <Testimonials testimonials={filteredTestimonials} about={filteredAbout} />
                    <div>Testimonials</div>
                    {/* End Testimonials */}
                    {/* Blog */}
                    <Blog services={filteredServices} about={filteredAbout} />
                    {/* End Blog */}
                    <Contact about={filteredAbout} />
                </main>
                <Footer social={filteredSocialHandles}/>
            </Fragment>
        </>
    );
}

export default Home;
