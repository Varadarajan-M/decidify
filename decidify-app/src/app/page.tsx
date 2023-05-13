import '@/styles/pages/landing-page.scss';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<main className='container'>
			<h1 className='gradient-header'>Decidify!</h1>
			<p className='tagline-text'>
				Stop second-guessing and start deciding! Create your own
				<b> FREE anonymous</b> polls and let the people decide!
			</p>
			<Link role='button' href='/new-poll' className='create-poll-btn'>
				Let&apos;s create a poll
			</Link>
		</main>
	);
}
