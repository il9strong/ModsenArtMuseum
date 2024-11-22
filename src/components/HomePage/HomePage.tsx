import React, { ChangeEvent, useEffect, useState } from 'react';
import './homePage.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import axios from 'axios';
import ArtCard from '@/components/ArtCard/ArtCard';
import ArtCardSmall from '@/components/ArtCardSmall/ArtCardSmall';
import { useDebounce } from '@/hooks/useDebounce';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArtResult } from '@/types/type';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import searcIcon from '@/assets/images/search.svg';
import { sortResults } from '@/utils/sortResults';
import { getDisplayedPages } from '@/utils/getDisplayedPages';

function HomePage() {
	const [results, setResults] = useState<ArtResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [sortOrder, setSortOrder] = useState<'title' | 'artist'>('title');
	const [otherArtworks, setOtherArtworks] = useState<ArtResult[]>([]);
	const [topicsArtworks, setTopicsArtworks] = useState<ArtResult[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const schema = Yup.object().shape({
		search: Yup.string()
			.min(2, 'Minimum length 2 characters')
			.required('This field is required'),
	});
	
	const totalPages = Math.ceil(topicsArtworks.length / ITEMS_PER_PAGE);

	const displayedPages = getDisplayedPages(currentPage, totalPages);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			search: '',
		},
	});

	const debouncedSearchTerm = useDebounce(watch('search'), 500);

	useEffect(() => {
		if (debouncedSearchTerm.trim().length >= 2) {
			fetchResults(debouncedSearchTerm);
		} else {
			setResults([]);
		}
	}, [debouncedSearchTerm]);

	useEffect(() => {
		fetchOtherArtworks();
		fetchTopicsArtworks();
	}, []);

	const fetchResults = async (query: string) => {
		if (!query.trim()) return;

		setLoading(true);
		setError('');
		setResults([]);

		try {
			const response = await axios.get(
				`https://api.artic.edu/api/v1/artworks/search`,
				{
					params: {
						q: query,
						fields: 'id,title,image_id,artist_title,is_public_domain',
					},
					headers: {
						'AIC-User-Agent': 'aic-bash (engineering@artic.edu)',
					},
				}
			);

			const rawData = response.data.data;

			const filteredData: ArtResult[] = rawData
				.map((item: any) => ({
					id: item.id,
					title: item.title,
					artistTitle: item.artist_title,
					imageId: item.image_id,
					isPublicDomain: !!item.is_public_domain,
				}))
				.filter(
					(item: ArtResult) =>
						item.title.toLowerCase().includes(query.toLowerCase()) ||
						(item.artistTitle || '').toLowerCase().includes(query.toLowerCase())
				);

			setResults(filteredData);
		} catch (err) {
			throw Error(err as string);
			setError('Failed to load data. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const fetchOtherArtworks = async () => {
		try {
			const response = await axios.get(
				`https://api.artic.edu/api/v1/artworks`,
				{
					params: {
						limit: 9,
						fields: 'id,title,image_id,artist_title,is_public_domain',
					},
					headers: {
						'AIC-User-Agent': 'aic-bash (engineering@artic.edu)',
					},
				}
			);

			const rawData = response.data.data;

			const artworks: ArtResult[] = rawData.map((item: any) => ({
				id: item.id,
				title: item.title,
				artistTitle: item.artist_title,
				imageId: item.image_id,
				isPublicDomain: !!item.is_public_domain,
			}));

			setOtherArtworks(artworks);
		} catch (err) {
			console.error('Error fetching other artworks:', err);
		}
	};

	const fetchTopicsArtworks = async () => {
		try {
			const response = await axios.get(
				`https://api.artic.edu/api/v1/artworks`,
				{
					params: {
						limit: 21,
						fields: 'id,title,image_id,artist_title,is_public_domain',
					},
					headers: {
						'AIC-User-Agent': 'aic-bash (engineering@artic.edu)',
					},
				}
			);

			const rawData = response.data.data;

			const artworks: ArtResult[] = rawData.map((item: any) => ({
				id: item.id,
				title: item.title,
				artistTitle: item.artist_title,
				imageId: item.image_id,
				isPublicDomain: !!item.is_public_domain,
			}));

			setTopicsArtworks(artworks);
		} catch (err) {
			console.error('Error fetching topics artworks:', err);
		}
	};

	const sortedResults = sortResults(results, sortOrder);

	const displayedTopics = topicsArtworks.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {setSortOrder(e.target.value as 'title' | 'artist')};
	const handleBackPages = () => setCurrentPage((prev) => prev - 1);
	const handleActivePage = (page: number) => () => setCurrentPage(page);
	const handleForwardPages = () => setCurrentPage((prev) => prev + 1);

	return (
		<div className="wrapper">
			<Header />
			<main>
				<h1>
					Let&apos;s Find Some <span>Art</span> Here!
				</h1>
				<section className="searchBlock">
					<form onSubmit={handleSubmit(() => {})}>
						<input
							type="text"
							{...register('search')}
							className="search"
							placeholder="Search Art, Artist, Work..."
						/>
						<button type="submit" className="submit" aria-label="Search">
							<img src={searcIcon} alt="searchIcon" />
						</button>
						{errors.search && (
							<div className="errorMessage">{errors.search.message}</div>
						)}
					</form>

					{sortedResults.length !== 0 && (
						<div className="sortResults">
							<select
								value={sortOrder}
								onChange={handleSelectChange}
								className="sortSelect"
							>
								<option value="title">Sort by name</option>
								<option value="artist">Sort by author</option>
							</select>
						</div>
					)}

					{loading && <div className="loader"></div>}
					{error && <div className="errorMessage">{error}</div>}

					<div className="results">
						{!loading &&
							!error &&
							debouncedSearchTerm.trim().length >= 2 &&
							sortedResults.length === 0 && (
								<div className="noResults">
									No results found for your query.
								</div>
							)}

						{sortedResults.map(
							({ id, title, artistTitle, imageId, isPublicDomain }) => (
								<ArtCard
									key={id}
									id={id}
									title={title}
									artistTitle={artistTitle}
									imageId={imageId}
									isPublicDomain={isPublicDomain}
								/>
							)
						)}
					</div>
				</section>
				<section className="topics">
					<p className="preTitle">Topics for you</p>
					<h3>Our special gallery</h3>
					<div className="topicsList">
						{displayedTopics.map(
							({ id, title, artistTitle, imageId, isPublicDomain }) => (
								<ArtCard
									key={id}
									id={id}
									title={title}
									artistTitle={artistTitle}
									imageId={imageId}
									isPublicDomain={isPublicDomain}
								/>
							)
						)}
					</div>

					<div className="pagination">
						{currentPage > 1 && (
							<div
								className="arrowWrapper"
								onClick={handleBackPages}
							>
								<button className="prevArrow"></button>
							</div>
						)}

						{displayedPages.map((page) => (
							<button
								key={page}
								className={`pageButton ${page === currentPage ? 'active' : ''}`}
								onClick={handleActivePage(page)}
							>
								{page}
							</button>
						))}

						{currentPage < totalPages && (
							<div
								className="arrowWrapper"
								onClick={handleForwardPages}
							>
								<button className="nextArrow"></button>
							</div>
						)}
					</div>
				</section>
				<section className="other">
					<p className="preTitle">Here some more</p>
					<h3>Other works for you</h3>
					<div className="otherList">
						{otherArtworks.map(
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
						)}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default HomePage;
