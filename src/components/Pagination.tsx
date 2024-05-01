type PaginationProps = {
	prevDisabled?: boolean;
	nextDisabled?: boolean;
	onPrev: () => void;
	onNext: () => void;
	onPageChange: (page: number) => void;
	page: number;
	totalPages: number;
};
const Pagination = ({
	prevDisabled,
	nextDisabled,
	onPrev,
	onNext,
	onPageChange,
	page,
	totalPages,
}: PaginationProps) => {
	return (
		<div className='flex gap-3 justify-center'>
			<button
				className='text-white bg-cyan-500 rounded-md px-3 py-2 disabled:opacity-60 disabled:hover:bg-cyan-400 hover:bg-blue-400'
				onClick={onPrev}
				disabled={prevDisabled}
			>
				Previous
			</button>
			{Array.from({ length: totalPages || 0 }, (_, i) => i + 1).map((i) => (
				<button
					key={i}
					className={`text-white bg-cyan-500 disabled:hover:bg-cyan-400 hover:bg-blue-400 rounded-md px-3 py-2 ${
						page === i ? 'bg-purple-900' : ''
					}`}
					onClick={() => onPageChange(i)}
				>
					{i}
				</button>
			))}
			<button
				className='text-white bg-cyan-500 rounded-md px-3 py-2 disabled:opacity-60 disabled:hover:bg-cyan-400 hover:bg-blue-400'
				onClick={onNext}
				disabled={nextDisabled}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
