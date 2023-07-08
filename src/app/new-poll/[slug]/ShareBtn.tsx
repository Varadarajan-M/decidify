'use client';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';
import { BiShareAlt } from 'react-icons/bi';

type ShareBtnProps = {
	url: string;
} & HTMLMotionProps<'button'>;

const ShareBtn: React.FC<ShareBtnProps> = (props: ShareBtnProps) => {
	const handleShare = () =>
		typeof navigator.share === 'function'
			? navigator.share({
					url: props.url,
			  })
			: alert('Share not supported');

	return (
		<motion.button {...props} onClick={handleShare} className={`share-btn`}>
			{<BiShareAlt />}
			<span>Share with friends</span>
		</motion.button>
	);
};

export default ShareBtn;
