import { NextApiRequest, NextApiResponse } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const GET = (_: NextApiRequest, res: NextApiResponse) => {
	const url =
		process.env.NODE_ENV === 'development'
			? process.env.OAUTH_URL_DEV || ''
			: process.env.OAUTH_URL_PROD || '';

	return redirect(url, RedirectType.replace);
};
