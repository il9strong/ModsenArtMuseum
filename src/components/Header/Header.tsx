import React, { useState } from 'react';
import './header.scss';
import logo from '@/assets/images/logo.svg';
import bookmark from '@/assets/images/bookmark.svg';
import menuIcon from '@/assets/images/menu.svg';
import closeIcon from '@/assets/images/cross.svg';
import { Link, useLocation } from 'react-router-dom';
import home from '@/assets/images/home.svg';

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<>
			<div className="header">
				<div className="topBar">
					<Link to="/">
						<img src={logo} alt="Logo" className="logo" />
					</Link>
					<div className="navLinks">
						{isHomePage ? (
							<Link to="/favorites" className="favorites">
								<img src={bookmark} alt="bookmark" />
								<span>Your favorites</span>
							</Link>
						) : (
							<div className="header__buttons">
								<Link to="/" className="home">
									<img src={home} alt="home" />
									<span>Home</span>
								</Link>
								<Link to="/favorites" className="favorites">
									<img src={bookmark} alt="bookmark" />
									<span>Your favorites</span>
								</Link>
							</div>
						)}
					</div>
					<button className="menuButton" onClick={toggleMenu}>
						<img
							src={menuOpen ? closeIcon : menuIcon}
							className={menuOpen ? 'close' : 'open'}
							alt="Menu"
						/>
					</button>
				</div>

				<div className={`menu ${menuOpen ? 'menu--open' : ''}`}>
					{isHomePage ? (
						<Link to="/favorites" className="menuItem" onClick={toggleMenu}>
							Your favorites
						</Link>
					) : (
						<>
							<Link to="/" className="menuItem" onClick={toggleMenu}>
								Home
							</Link>
							<Link to="/favorites" className="menuItem" onClick={toggleMenu}>
								Your favorites
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;
