import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo_black.svg';
import modsenLogo from '@/assets/images/logo modsen-02 2.png';
import './footer.scss';

function Footer() {
	return (
		<>
			<footer className="footer">
				<div className="bottom-bar">
					<Link to="/">
						<img src={logo} alt="Logo" className="logo" />
					</Link>
					<img src={modsenLogo} alt="modsen logo" className="modsen-logo" />
				</div>
			</footer>
		</>
	);
}

export default Footer;
