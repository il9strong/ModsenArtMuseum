import React from 'react';
import { Link } from 'react-router-dom';
import './artCardSmall.scss';
import ToFavoriteButton from '@/components/ToFavoriteButton/ToFavoriteButton';
import { ArtCardProps } from '@/types/type';

const ArtCardSmall: React.FC<ArtCardProps> = ({
	id,
	title,
	artistTitle,
	imageId,
	isPublicDomain,
}) => {
	return (
		<div className="favoriteItem">
			<Link key={id} to={`/art/${id}`}>
				<img
					src={`https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`}
					alt={title}
					className="favoriteImage"
				/>
			</Link>
			<div className="info">
				<Link key={id} to={`/art/${id}`} className="title" title={title}>
					{title}
				</Link>
				<p className="author" title={artistTitle || 'Unknown author'}>
					{artistTitle || 'Unknown author'}
				</p>
				<p className="access">{isPublicDomain ? 'Public' : 'Private'}</p>
			</div>
			<ToFavoriteButton
				artId={id}
				title={title}
				artistTitle={artistTitle}
				imageId={imageId}
				isPublicDomain={isPublicDomain}
			/>
		</div>
	);
};

export default ArtCardSmall;
