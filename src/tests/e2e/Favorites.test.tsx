import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import App from '@/App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
	it('button home in DOM', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const buttonsFavorites = screen.getAllByText(/your favorites/i);
		const buttonFavorites = buttonsFavorites[0];

		expect(screen.queryByText("Let's Find Some Here!")).toBeInTheDocument();

		fireEvent.click(buttonFavorites);

		expect(screen.queryByText('Here are your')).toBeInTheDocument();

		const buttonsHome = screen.getAllByAltText(/home/i);
		const buttonHome = buttonsHome[0];

		expect(buttonHome).toBeInTheDocument();
	});
	it('click home button', () => {
		render(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
		const buttonsHome = screen.getAllByAltText(/home/i);
		const buttonHome = buttonsHome[0];

		expect(screen.queryByText("Here are your")).toBeInTheDocument();

		fireEvent.click(buttonHome);

		expect(screen.queryByText("Let's Find Some Here!")).toBeInTheDocument();
	});
});
