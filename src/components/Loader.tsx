const Loader = ({ width, height }: { width?: string; height?: string }) => {
	return <span className='loader' style={{ width, height }}></span>;
};

export default Loader;
