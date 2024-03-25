'use client';

import Link from 'next/link';
import RoundedCheck from '@/components/assets/roundedCheck';
import './styles.scss';

const Success = ({ params: { id } }: { params: { id: string } }) => {
	return (
		<div className={'page'}>
			<div className={'container'}>
				<RoundedCheck className={'icon'} />
				<h1 className={'title'}>
					Successfully added PaBot to your server !
				</h1>

				<Link
					href={`discord://-/channels/${id}`}
					target={'_blank'}
					className={'button'}
				>
					Enjoy it on Discord
				</Link>
			</div>
		</div>
	);
};

export default Success;
