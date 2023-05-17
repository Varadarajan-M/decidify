'use client';

import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';
interface IGenericProps {
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

interface IButtonProps extends IGenericProps {
	onClick?: (...args: any[]) => void;
}

const Button = ({ className, children, onClick }: IButtonProps) => {
	return (
		<button onClick={onClick} className={className}>
			{children}
		</button>
	);
};

type CopyToClipboardBtnProps = {
	text: string;
};

const CopyToClipboardBtn: React.FC<CopyToClipboardBtnProps> = (
	props: CopyToClipboardBtnProps,
) => {
	const [message, setMessage] = useState<string>('Copy to clipboard');
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setMessage('Copied to Clipboard');
			setCopied(true);
		});
	};

	return (
		<Button
			onClick={() => copyToClipboard(props.text)}
			className={`copy-to-clipboard-btn ${copied ? 'copied' : ''}`}
		>
			<span>{message}</span>
			{copied ? <TiTick /> : <BiCopy />}
		</Button>
	);
};

export default CopyToClipboardBtn;
