import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../App.scss';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Work from '../components/Work';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../layouts/Footer';
import TypingAnimation from '../components/TypingAnimation';
import { FaICursor } from 'react-icons/fa';
function Home() {
    const params = useParams();
    const navigate = useNavigate();

    const userId = '65b3a22c01d900e96c4219ae'; //John doe

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

    // if (isLoading) {
    //     return <div className="w-full h-screen bg-black flex items-center justify-center text-center">Loading..</div>;     //Need to Fix
    // }
    const [toggle, setToggle] = useState(false);
    if(filteredAbout === undefined){
        return <div>Loading...</div>;
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
                            <a className="nav-link" href="#home">
                                <i className="fas fa-house-damage" />
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#about">
                                <i className="far fa-address-card" />
                                <span>About Me</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#services">
                                <i className="fas fa-concierge-bell" />
                                <span>Services</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#work">
                                <i className="fas fa-briefcase" />
                                <span>Portfolio</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#blog">
                                <i className="fas fa-blog" />
                                <span>Blog</span>
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#contactus">
                                <i className="fas fa-id-card-alt" />
                                <span>Contact</span>
                            </a>
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
                                            <TypingAnimation />
                                        </h2>
                                        <p>
                                            The namics of how users interact with interactive elements within a user interface flow chart based on
                                            container proportion.
                                        </p>
                                        <div className="btn-bar go-to">
                                            <a className="m-btn m-btn-theme" href="#work">
                                                my work
                                            </a>
                                            <a className="m-btn m-btn-t-theme" href="#contactus">
                                                Hire Me
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="go-to go-to-next">
                            <a href="#about">
                                <span />
                            </a>
                        </div>
                    </section>
                    {/* End Home Banner */}

                    {/* End Home Banner */}
                    {/* about us */}
                    <About about={filteredAbout} social={filteredSocialHandles} />
                    {/* end about us */}
                    {/* fun */}
                    <Skills />
                    {/* End fun */}
                    {/* resume */}
                    <Services />
                    {/* End resume */}
                    {/* Work */}
                    <Work />
                    {/* End work */}
                    {/* Testiminails */}
                    {/* <Testiminails /> */}
                    <div>Testimonials</div>
                    {/* End Testiminails */}
                    {/* Blog */}
                    <Blog />
                    {/* End Blog */}
                    <Contact />
                </main>
                <Footer />
            </Fragment>
        </>
    );
}

export default Home;
