import '@/styles/pages/landing-page.scss';
import Link from 'next/link';
import { HomeVariant } from './animations/variants';

import { Div, H1, Main, P } from './animations/MotionComponents';

export default function LandingPage() {
	const { container, item } = HomeVariant;
	return (
		<Main
			variants={container}
			initial='hidden'
			animate='show'
			className='container'
		>
			<H1 className='gradient-header' variants={item}>
				Decidify!
			</H1>
			<P className='tagline-text' variants={item}>
				Stop second-guessing and start deciding! Create your own
				<b> FREE anonymous</b> polls and let the people decide!
			</P>

			<Div variants={item} className='create-poll-btn'>
				<Link role='button' href='/new-poll'>
					Let&apos;s create a poll
				</Link>
			</Div>
		</Main>
	);
}
