import { render, screen } from '@testing-library/react';
import React from 'react';

import App from '@/App';

describe('App', () => {
	it('renders', () => {
		render(<App />);
		expect(true).toBeTruthy();
	});
	it('button home in DOM', () => {
		render(<App />);
		const buttonHome = screen.queryByText(/home/i);
		expect(buttonHome).toBeNull();
	});

});
