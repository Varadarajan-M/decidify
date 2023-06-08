'use client';
import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

type GenericProps = {
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
};

export function Main(props: GenericProps & HTMLMotionProps<'main'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.main className={className} style={style} {...motionProps}>
			{props.children}
		</motion.main>
	);
}

export function H1(props: GenericProps & HTMLMotionProps<'h1'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.h1 className={className} style={style} {...motionProps}>
			{props.children}
		</motion.h1>
	);
}
export function P(props: GenericProps & HTMLMotionProps<'p'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.p className={className} style={style} {...motionProps}>
			{props.children}
		</motion.p>
	);
}
export function Span(props: GenericProps & HTMLMotionProps<'span'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.span className={className} style={style} {...motionProps}>
			{props.children}
		</motion.span>
	);
}

export function Div(props: GenericProps & HTMLMotionProps<'div'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.div className={className} style={style} {...motionProps}>
			{props.children}
		</motion.div>
	);
}

export function Button(props: GenericProps & HTMLMotionProps<'button'>) {
	const { className, style, ...motionProps } = props;

	return (
		<motion.button className={className} style={style} {...motionProps}>
			{props.children}
		</motion.button>
	);
}
