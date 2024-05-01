import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { PaginatedPostFeed } from '../components/PostFeed';
import useDeletePost from '../hooks/useDeletePost';
import { usePosts } from '../hooks/usePosts';
import usePrefetchPost from '../hooks/usePrefetchPost';

const Summary = () => {
	return (
		<div className='p-6 text-white flex flex-col gap-2'>
			<h1 className='text-3xl font-bold underline text-yellow-100'>
				Paginated Post Feed
			</h1>
			<p>
				This example shows how to fetch a post feed with pagination using{' '}
				<code className='text-yellow-500'>useQuery</code> hook.
			</p>
		</div>
	);
};
const PostFeed = () => {
	const [page, setPage] = useState(1);

	const {
		data: res,
		isLoading,
		isError,
		isFetching,
		isPlaceholderData,
		error,
	} = usePosts(page);

	const { onPostDelete } = useDeletePost(['posts', { page }]);

	const navigate = useNavigate();

	const onPostEdit = (id: number) => navigate(`/post/${id}/edit`);

	const prefetchPost = usePrefetchPost();

	return (
		<main className='pb-6 flex flex-col gap-3'>
			<Summary />
			{!isLoading && res?.data && (
				<Pagination
					prevDisabled={!res?.prev}
					nextDisabled={!res?.next}
					onPrev={() => setPage(page - 1)}
					onNext={() => setPage(page + 1)}
					onPageChange={setPage}
					page={page}
					totalPages={res?.last || 0}
				/>
			)}
			<PaginatedPostFeed
				data={res?.data}
				isLoading={isLoading}
				isError={isError}
				error={error?.message || 'Something went wrong'}
				isFetching={isFetching}
				isShowingOldData={isPlaceholderData}
				onPostEdit={onPostEdit}
				onPostDelete={onPostDelete}
				onPostInteraction={prefetchPost}
			/>
			{!isLoading && res?.data && (
				<Pagination
					prevDisabled={!res?.prev}
					nextDisabled={!res?.next}
					onPrev={() => setPage(page - 1)}
					onNext={() => setPage(page + 1)}
					onPageChange={setPage}
					page={page}
					totalPages={res?.last || 0}
				/>
			)}
		</main>
	);
};

export default PostFeed;
