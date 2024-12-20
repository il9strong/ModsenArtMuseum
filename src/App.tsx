import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/components/HomePage/HomePage';
import Favorites from '@/components/Favorites/Favorites';
import Art from '@/components/Art/Art';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ErrorBoundary>
						<HomePage />
					</ErrorBoundary>
				}
			/>
			<Route
				path="/favorites"
				element={
					<ErrorBoundary>
						<Favorites />
					</ErrorBoundary>
				}
			/>
			<Route
				path="art/:id"
				element={
					<ErrorBoundary>
						<Art />
					</ErrorBoundary>
				}
			/>
		</Routes>
	);
}

export default App;
