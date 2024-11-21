import { ReactNode } from 'react';

export interface ToFavoriteButtonProps {
	artId: string;
	title: string;
	artistTitle?: string;
	imageId?: string;
	isPublicDomain: boolean;
}

export interface ArtCardProps {
	id: string;
	title: string;
	artistTitle?: string;
	imageId: string;
	isPublicDomain: boolean;
}

export interface ArtResult {
	id: string;
	title: string;
	artistTitle?: string;
	imageId: string;
	isPublicDomain: boolean;
}

export interface ArtCardProps {
	id: string;
	title: string;
	artistTitle?: string;
	imageId: string;
	isPublicDomain: boolean;
}

export interface FavoriteItem {
	id: string;
	title: string;
	artistTitle?: string;
	imageId: string;
	isPublicDomain: boolean;
}

export interface ArtDetails {
	id: string;
	title: string;
	artistTitle: string;
	artistDisplay?: string;
	dateStart?: number;
	dateEnd?: number;
	dimensions?: string;
	creditLine?: string;
	repository?: string;
	isPublicDomain: boolean;
	imageId?: string;
}

export interface ErrorBoundaryProps {
	children: ReactNode;
}

export interface ErrorBoundaryState {
	hasError: boolean;
}
