import { ArtResult } from "@/types/type";

export const sortResults = (results: ArtResult[], order: 'title' | 'artist') => {
	return [...results].sort((a, b) => {
		const fieldA = order === 'title' ? a.title : a.artistTitle || '';
		const fieldB = order === 'title' ? b.title : b.artistTitle || '';
		return fieldA.localeCompare(fieldB, undefined, { sensitivity: 'base' });
	});
};