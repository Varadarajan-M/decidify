const Loader = () => {
	return (
		<div className='lds-ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export const LoaderContainer = () => (
	<div className='loader-container'>
			<Loader />
	</div>
)

export default Loader;
