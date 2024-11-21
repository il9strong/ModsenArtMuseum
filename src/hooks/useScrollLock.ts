import { useEffect } from "react";

export const useLockScroll = (isMenuOpen: boolean) => {
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		if(isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = originalStyle;
		}
		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, [isMenuOpen]);
};
