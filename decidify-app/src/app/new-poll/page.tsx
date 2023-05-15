import React from 'react';
import '@/styles/pages/new-poll.scss';
import PollForm from '../components/poll/PollForm';

const NewPollPage = () => {
	return (
		<section className='new-poll-container'>
			<div className='form-container'>
				<h3 className='new-poll-form-header'>Create Your Poll Now!</h3>
				<PollForm />
			</div>
		</section>
	);
};

export default NewPollPage;
