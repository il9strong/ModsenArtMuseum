import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '@/App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
	it('renders', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		expect(true).toBeTruthy();
	});
	it('button home in DOM', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const buttonHome = screen.queryByText(/home/i);
		expect(buttonHome).toBeNull();
	});
	it('renders search input and button', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const searchInput = screen.getByPlaceholderText(
			/search art, artist, work/i
		);
		const searchButton = screen.getByRole('button', { name: /search/i });
		expect(searchInput).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();
	});
	it('displays error for invalid search input', async () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const searchInput = screen.getByPlaceholderText(
			/search art, artist, work/i
		);
		const submitButton = screen.getByRole('button', { name: /search/i });

		fireEvent.change(searchInput, { target: { value: 'a' } });
		fireEvent.click(submitButton);

		const errorMessage = await screen.findByText(
			/minimum length 2 characters/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
	it('input event', async () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const searchInput = screen.getByPlaceholderText(
			/search art, artist, work/i
		) as HTMLInputElement;
		expect(searchInput.value).toBe('');
		await userEvent.type(searchInput, 'something');
		expect(searchInput.value).toBe('something');
	});
	it('changes sort order when dropdown is selected', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const sortSelect = screen.getByRole('combobox') as HTMLSelectElement;
		expect(sortSelect.value).toBe('title');

		fireEvent.change(sortSelect, { target: { value: 'artist' } });
		expect(sortSelect.value).toBe('artist');
	});
});
