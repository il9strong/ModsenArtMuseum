import { ArtResult } from '@/types/type';
import { sortResults } from '@/utils/sortResults';

describe('sortResults', () => {
	const results: ArtResult[] = [
		{
			id: '1',
			title: 'The Starry Night',
			artistTitle: 'Vincent van Gogh',
			imageId: 'image1',
			isPublicDomain: true,
		},
		{
			id: '2',
			title: 'Mona Lisa',
			artistTitle: 'Leonardo da Vinci',
			imageId: 'image2',
			isPublicDomain: true,
		},
		{
			id: '3',
			title: 'The Last Supper',
			artistTitle: 'Leonardo da Vinci',
			imageId: 'image3',
			isPublicDomain: true,
		},
		{
			id: '4',
			title: 'The Persistence of Memory',
			artistTitle: 'Salvador Dali',
			imageId: 'image4',
			isPublicDomain: true,
		},
	];

	test('sorts by title in ascending order', () => {
		const sorted = sortResults(results, 'title');
		
		const expectedTitles = [
			'Mona Lisa',
			'The Last Supper',
			'The Persistence of Memory',
			'The Starry Night',
		];

		expect(sorted.map((result) => result.title)).toEqual(expectedTitles);
	});

	test('sorts by artist in ascending order', () => {
		const sorted = sortResults(results, 'artist');
		
		const expectedArtists = [
			'Leonardo da Vinci',
			'Leonardo da Vinci',
			'Salvador Dali',
			'Vincent van Gogh',
		];

		expect(sorted.map((result) => result.artistTitle)).toEqual(expectedArtists);
	});
});
