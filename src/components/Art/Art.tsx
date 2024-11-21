import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './art.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ToFavoriteButton from '@/components/ToFavoriteButton/ToFavoriteButton';
import { ArtDetails } from '@/types/type';

function Art() {
	const { id } = useParams();
	const [artDetails, setArtDetails] = useState<ArtDetails | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get(`https://api.artic.edu/api/v1/artworks/${id}`, {
				headers: {
					'AIC-User-Agent': 'aic-bash (engineering@artic.edu)',
				},
			})
			.then((response) => {
				const data = response.data.data;

				const transformedData: ArtDetails = {
					id: data.id,
					title: data.title,
					artistDisplay: data.artist_display,
					artistTitle: data.artist_title,
					dateStart: data.date_start,
					dateEnd: data.date_end,
					dimensions: data.dimensions,
					creditLine: data.credit_line,
					repository: data.repository,
					isPublicDomain: data.is_public_domain,
					imageId: data.image_id,
				};

				setArtDetails(transformedData);
				setError(null);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching artwork data:', error);
				setError('Error loading artwork details. Please try again later.');
				setIsLoading(false);
			});
	}, [id]);

	const artistRegex = /^([^(\n]+)[\s(]*(\w+).*?,/;

	let artistCountry = 'Unknown country';

	if (artDetails?.artistDisplay) {
		const match = artDetails.artistDisplay.match(artistRegex);
		if (match) {
			artistCountry = match[2].trim();
		}
	}

	return (
		<>
			<Header />
			<main>
				{isLoading && <div className="loader"></div>}
				{error && <div className="errorMessage">{error}</div>}
				<div className="artDetail">
					{!isLoading && !error && artDetails && (
						<>
							<div className="artImageBlock">
								<img
									src={`https://www.artic.edu/iiif/2/${artDetails.imageId}/full/843,/0/default.jpg`}
									alt={artDetails.title}
									className="artImage"
								/>
								<ToFavoriteButton
									artId={artDetails.id}
									title={artDetails.title}
									artistTitle={artDetails.artistTitle}
									imageId={artDetails.imageId}
									isPublicDomain={artDetails.isPublicDomain}
								/>
							</div>
							<div className="artInfo">
								<section>
									<h1 className="title">{artDetails.title}</h1>
									<h2 className="author">{artDetails.artistTitle}</h2>
									<p className="date">
										{artDetails.dateStart} - {artDetails.dateEnd}
									</p>
								</section>
								<section className="overview">
									<h2>Overview</h2>
									<div className="info">
										<p>
											<span>Nationality:</span> {artistCountry}
										</p>

										<p>
											<span>Dimensions:</span> {artDetails.dimensions}
										</p>
										<p>
											<span>Credit Line:</span> {artDetails.creditLine}
										</p>
										<p>
											<span>Repository:</span> {artDetails.repository}
										</p>
										<p>{artDetails.isPublicDomain ? 'Public' : 'Private'}</p>
									</div>
								</section>
							</div>
						</>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}

export default Art;
