const Footer = ({ social }) => {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 m-10px-tb">
                        <div className="nav justify-content-center justify-content-md-start" style={{ paddingLeft: '6rem' }}>
                            <a href={social[3].url}>
                                <i className="fab fa-facebook-f" />{' '}
                            </a>
                            <a href={social[2].url}>
                                <i className="fab fa-twitter" />{' '}
                            </a>
                            <a href={social[0].url}>
                                <i className="fab fa-instagram" />{' '}
                            </a>
                            <a href={social[1].url}>
                                <i className="fab fa-linkedin-in" />{' '}
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 m-10px-tb text-center text-md-right">
                        <p>© {new Date().getFullYear()} copyright all right reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
