import '@/styles/pages/landing-page.scss';

export default function LandingPage() {
	return (
		<main className='container'>
			<h1 className='gradient-header'>Decidify!</h1>
			<p className='tagline-text'>
				Stop second-guessing and start deciding! Create your own
				<b> FREE anonymous</b> polls and let the people decide!
			</p>
			<button className='create-poll-btn'>Let&apos;s create a poll</button>
		</main>
	);
}
