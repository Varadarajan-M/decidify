import Link from 'next/link';

type ErrorPageProps = {
	error?: string;
};

const ErrorPage = (props: ErrorPageProps) => {
	return (
		<section className='error-container'>
			<h3 className='error-header'>Error :(</h3>
			<p className='error-message'>{props.error ?? 'Something went wrong:('}</p>
			<Link role='button' href='/' className='home-btn'>
				{' '}
				Go Home
			</Link>
		</section>
	);
};

export default ErrorPage;
