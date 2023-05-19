import '@/styles/pages/new-poll-success.scss';
import CopyToClipboardBtn from './CopyToClipboardBtn';

type PageProps = {
	params: {
		slug: string;
	};
};

const NewPollCreatedPage = ({ params }: PageProps) => {
	const { slug } = params;

	return (
		<section className='container'>
			<div className='poll-success-message-container'>
				<h3 className='poll-success-header'>Poll Created Successfully!</h3>

				<p className='poll-share-message'>
					Share your poll with others and get their opinions!
				</p>

				<CopyToClipboardBtn text={slug} />
			</div>
		</section>
	);
};

export default NewPollCreatedPage;
