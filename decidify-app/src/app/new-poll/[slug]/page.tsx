import '@/styles/pages/new-poll-success.scss';
import CopyToClipboardBtn from './CopyToClipboardBtn';
import { Div, H1, P } from '@/app/animations/MotionComponents';
import { NewPollVariant } from '@/app/animations/variants';

const { container, item } = NewPollVariant;

type PageProps = {
	params: {
		slug: string;
	};
};

const NewPollCreatedPage = ({ params }: PageProps) => {
	const { slug } = params;

	return (
		<section className='container'>
			<Div
				className='poll-success-message-container'
				tabIndex={-1}
				variants={container}
				initial='hidden'
				animate='show'
			>
				<H1 variants={item} className='poll-success-header'>
					Poll Created Successfully!
				</H1>

				<P variants={item} className='poll-share-message'>
					Share your poll with others and get their opinions!
				</P>

				<CopyToClipboardBtn
					whileTap={{
						scale: 0.7,
						transition: { type: 'spring' },
					}}
					// whileHover={{ scale: 1.1, transition: { type: 'spring' } }}
					variants={item}
					text={slug}
				/>
			</Div>
		</section>
	);
};

export default NewPollCreatedPage;
