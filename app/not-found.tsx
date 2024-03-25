import './not-found.scss';
import Link from 'next/link';

const NotFound = () => {
	return (
		<div className={'page'}>
			<div className={'header'}>
				<h1 className={'title'}>404</h1>
				<h2 className={'description'}>It seems that you are lost.</h2>
			</div>
			<Link
				href={'/'}
				className={'button'}
			>
				Home
			</Link>
		</div>
	);
};

export default NotFound;
