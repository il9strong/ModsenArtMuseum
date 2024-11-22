import { getDisplayedPages } from '@/utils/getDisplayedPages';

describe('getDisplayedPages', () => {
	test('should return correct pages when current page is in the middle', () => {
		expect(getDisplayedPages(3, 10)).toEqual([1, 2, 3, 4]);
	});

	test('should correctly handle the case where the current page is closer to the beginning', () => {
		expect(getDisplayedPages(1, 10)).toEqual([1, 2, 3, 4]);
	});

	test('should correctly handle the case when the current page is near the end', () => {
		expect(getDisplayedPages(9, 10)).toEqual([7, 8, 9, 10]);
	});
});
