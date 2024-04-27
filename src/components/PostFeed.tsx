import { Post as PostType } from '../types/post';
import Loader from './Loader';
import Post from './Post';

type PostFeedProps = {
	isFetching?: boolean;
	isShowingOldData?: boolean;
	isLoading: boolean;
	isError: boolean;
	error: string;
	data?: PostType[];
	onPostEdit?: (id: number) => void;
	onPostDelete?: (id: number) => void;
	onPostInteraction?: (id: string) => void;
};

export const PaginatedPostFeed = ({
	isLoading,
	isShowingOldData,
	isError,
	error,
	data,
	onPostEdit,
	onPostDelete,
	onPostInteraction,
	isFetching,
}: PostFeedProps) => {
	return (
		<div className='px-2 flex flex-col gap-3 pb-6'>
			{isFetching && (
				<div className='p-4 text-white animate-pulse'>
					Fetching in background...
				</div>
			)}

			{isShowingOldData && (
				<div className='p-4 text-white animate-pulse'>
					Showing old data while new data is being fetched in background...
				</div>
			)}

			{isError && (
				<div className='p-4 text-white text-center animate-pulse'>{error}</div>
			)}

			{isLoading && (
				<div className='w-full flex justify-center'>
					<Loader width={'48'} height={'48'} />
				</div>
			)}

			<div className='grid lg:grid-cols-3 lg:px-5 gap-3 p-2'>
				{data?.map((post: PostType) => (
					<Post
						key={post.id}
						post={post}
						onEdit={onPostEdit}
						onDelete={onPostDelete}
						onInteraction={onPostInteraction}
					/>
				))}
			</div>
		</div>
	);
};
