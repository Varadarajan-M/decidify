import React from 'react';
import '@/styles/pages/new-poll.scss';
import PollForm from '../components/poll/PollForm';
import { H1 } from '../animations/MotionComponents';

const NewPollPage = () => {
	return (
		<section className='new-poll-container'>
			<div className='form-container'>
				<H1
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 1,
						type: 'spring',
					}}
					className='new-poll-form-header'
				>
					Create Your Poll Now!
				</H1>
				<PollForm />
			</div>
		</section>
	);
};

export default NewPollPage;
