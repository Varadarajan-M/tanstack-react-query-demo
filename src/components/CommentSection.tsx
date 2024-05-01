import { useRef } from 'react';
import useComments from '../hooks/useComments';
import { PaginatedResponse } from '../types';
import { PostComment } from '../types/post';
import Comment from './Comment';

type CommentSectionProps = {
	pages: PaginatedResponse<PostComment>[];
	onAddComment: (data: { content: string; postId: number }) => void;
	postId: string;
} & Partial<ReturnType<typeof useComments>>;

const CommentSection = ({
	fetchNextPage,
	pages,
	isLoading,
	hasNextPage,
	onAddComment,
	postId,
}: CommentSectionProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddComment = () => {
		if (!inputRef.current) return;
		const content = inputRef.current.value;
		if (!content) return;
		onAddComment?.({ content, postId: +postId });
		inputRef.current.value = '';
	};

	return (
		<div className='flex flex-col gap-3 px-6'>
			<div className='flex justify-between gap-3 md:items-center flex-col md:flex-row'>
				{isLoading && (
					<p className='text-white animate-pulse'>Loading comments...</p>
				)}
				{!isLoading && (
					<>
						<h4 className='text-xl font-semibold '>
							{' '}
							Comments ({pages?.[0]?.items})
						</h4>
						<div className='flex items-center gap-3'>
							<input
								ref={inputRef}
								name='comment'
								type='text'
								placeholder='Comment'
								required
								className='bg-transparent border-purple-800 outline-none border rounded-lg px-3 py-2 focus:border-purple-500'
							/>
							<button
								onClick={handleAddComment}
								className='text-white bg-blue-500 rounded-md px-3 py-2  disabled:opacity-50 disabled:hover:bg-cyan-400 hover:bg-blue-400'
							>
								Add Comment
							</button>
						</div>
					</>
				)}
			</div>

			{!isLoading && (
				<>
					<div className='border p-4 border-purple-700 flex rounded-md flex-col gap-3 max-h-64 pb-4 overflow-auto bg-dark-blue bg-opacity-40 relative'>
						{pages?.map((page) =>
							page.data.map((comment) => (
								<Comment key={comment.id} comment={comment} />
							)),
						)}

						{pages?.[0]?.data?.length === 0 && (
							<p className='text-white text-center'>No comments yet</p>
						)}
					</div>
					{hasNextPage && pages.length && (
						<button
							onClick={() => fetchNextPage?.()}
							className='w-max mx-auto -mt-7 z-10 text-white bg-cyan-500 disabled:hover:bg-cyan-400 hover:bg-blue-400 rounded-md px-3 py-2 disabled:opacity-60'
						>
							Load more comments...
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default CommentSection;
