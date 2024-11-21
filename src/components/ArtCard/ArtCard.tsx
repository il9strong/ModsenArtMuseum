import React from 'react';
import './artCard.scss';
import { Link } from 'react-router-dom';
import ToFavoriteButton from '@/components/ToFavoriteButton/ToFavoriteButton';
import { ArtCardProps } from '@/types/type';

const ArtCard: React.FC<ArtCardProps> = ({
	id,
	title,
	artistTitle,
	imageId,
	isPublicDomain,
}) => {
	return (
		<div className="artCard">
			<Link key={id} to={`/art/${id}`} className="artImageWrapper">
				<img
					src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
					alt={title}
					className="artImage"
				/>
			</Link>
			<div className="cardInfo">
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
		</div>
	);
};

export default ArtCard;
