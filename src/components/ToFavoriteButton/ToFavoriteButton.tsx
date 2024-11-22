import React, { useState, useEffect } from 'react';
import bookmark from '@/assets/images/bookmark_saturated.svg';
import './toFavoriteButton.scss';
import { useLocation } from 'react-router-dom';
import { FavoriteItem, ToFavoriteButtonProps } from '@/types/type';

function ToFavoriteButton({
	artId,
	title,
	artistTitle,
	imageId,
	isPublicDomain,
}: ToFavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const favorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
		setIsFavorite(favorites.some((item: { id: string }) => item.id === artId));
	}, [artId]);

	const getFavoritesFromStorage = () => {
		return JSON.parse(sessionStorage.getItem('favorites') || '[]');
	};

	const saveFavoritesToStorage = (favorites: FavoriteItem[]) => {
		sessionStorage.setItem('favorites', JSON.stringify(favorites));
	};

	const toggleFavorite = () => {
		const favorites = getFavoritesFromStorage();
		let updatedFavorites;

		if (isFavorite) {
			updatedFavorites = favorites.filter(
				(item: { id: string }) => item.id !== artId
			);
		} else {
			const newFavorite = {
				id: artId,
				title,
				artistTitle,
				imageId,
				isPublicDomain,
			};
			updatedFavorites = [...favorites, newFavorite];
		}

		saveFavoritesToStorage(updatedFavorites);
		setIsFavorite(!isFavorite);
	};

	const isDetailPage = location.pathname.startsWith('/art/');

	return (
		<button
			className={`toFavorite ${isFavorite ? 'active' : ''} ${isDetailPage ? 'toFavoriteOnDetailPage' : ''}`}
			onClick={toggleFavorite}
		>
			<img src={bookmark} alt="bookmark" />
		</button>
	);
}

export default ToFavoriteButton;
