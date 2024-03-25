import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';

const retargetClient = () => {
	window.location.href =
		process.env.NODE_ENV === 'development'
			? process.env.OAUTH_URL_DEV || ''
			: process.env.OAUTH_URL_PROD || '';
};

const useDiscordOAuth = () => {
	const cookies = useCookies();
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const token = cookies.get('token');
		if (!token) {
			retargetClient();
			return;
		}

		(async () => {
			try {
				const response = await fetch(
					`${process.env.DISCORD_API}/users/@me`,
					{
						headers: {
							Authorization: token,
						},
					},
				);

				if (response.status === 401) {
					retargetClient();
					return;
				}

				setIsLogged(true);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [cookies]);

	return { isLogged };
};

export { useDiscordOAuth };
