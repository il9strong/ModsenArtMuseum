import { getDisplayedPages } from '@/utils/getDisplayedPages';

describe('getDisplayedPages', () => {
	test('должен возвращать правильные страницы, когда текущая страница посередине', () => {
		expect(getDisplayedPages(3, 10)).toEqual([1, 2, 3, 4]);
	});

	test('должен корректно обрабатывать случай, когда текущая страница ближе к началу', () => {
		expect(getDisplayedPages(1, 10)).toEqual([1, 2, 3, 4]);
	});

	test('должен корректно обрабатывать случай, когда текущая страница ближе к концу', () => {
		expect(getDisplayedPages(9, 10)).toEqual([7, 8, 9, 10]);
	});
});
