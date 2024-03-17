'use client';

import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import './styles.scss';

const Panel = () => {
	const cookies = useCookies();

	useEffect(() => {
		if (!cookies.get('token')) {
			window.location.href =
				process.env.NODE_ENV === 'development'
					? process.env.OAUTH_URL_DEV || ''
					: process.env.OAUTH_URL_PROD || '';
		}
	}, []);

	return <div>Panel</div>;
};

export default Panel;
