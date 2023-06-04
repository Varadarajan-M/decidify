'use client';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';

const copyTextInMobile = (text: string) => {
	const textArea = document.createElement('textarea');
	textArea.value = text;
	textArea.style.position = 'fixed';
	document.body.appendChild(textArea);
	textArea.select();
	textArea.setSelectionRange(0, textArea.value?.length);
	const isCopied = document.execCommand('copy');

	isCopied && document.body.removeChild(textArea);

	return isCopied;
};

type CopyToClipboardBtnProps = {
	text: string;
} & HTMLMotionProps<'button'>;

const CopyToClipboardBtn: React.FC<CopyToClipboardBtnProps> = (
	props: CopyToClipboardBtnProps,
) => {
	const [message, setMessage] = useState<string>('Copy to clipboard');
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async (text: string) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				setMessage('Copied to Clipboard');
				setCopied(true);
			});
		} else {
			setCopied(true);
			setMessage(
				copyTextInMobile(text)
					? 'Copied to Clipboard'
					: 'Cannot copy to clipboard',
			);
		}
	};

	return (
		<motion.button
			{...props}
			onClick={() =>
				copyToClipboard('http://localhost:3000/poll/' + props.text)
			}
			className={`copy-to-clipboard-btn ${copied ? 'copied' : ''}`}
		>
			<span>{message}</span>
			{copied ? <TiTick /> : <BiCopy />}
		</motion.button>
	);
};

export default CopyToClipboardBtn;
