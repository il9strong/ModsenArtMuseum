import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import bookmark from '@/assets/images/bookmark_saturated.svg';
import './favorites.scss';
import ArtCardSmall from '@/components/ArtCardSmall/ArtCardSmall';
import Footer from '@/components/Footer/Footer';
import { FavoriteItem } from '@/types/type';

function Favorites() {
	const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

	useEffect(() => {
		const storedFavorites = JSON.parse(
			sessionStorage.getItem('favorites') || '[]'
		);
		setFavorites(storedFavorites);
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<main>
				<h1>
					Here are your
					<span>
						<img src={bookmark} alt="bookmark" />
						Favorites
					</span>
				</h1>
				<section className="yourFavorites">
					<p className="saved-by-you">Saved by you</p>
					<h3>Your Favorites List</h3>

					<div className="favoritesList">
						{favorites.length > 0 ? (
							favorites.map(
								({ id, title, artistTitle, imageId, isPublicDomain }) => (
									<ArtCardSmall
										key={id}
										id={id}
										title={title}
										artistTitle={artistTitle}
										imageId={imageId}
										isPublicDomain={isPublicDomain}
									/>
								)
							)
						) : (
							<p className="noFavorites">You have no favorites yet.</p>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default Favorites;
