import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import Loader from '../components/Loader';
import Post from '../components/Post';
import useAddComment from '../hooks/useAddComment';
import useComments from '../hooks/useComments';
import useDeletePost from '../hooks/useDeletePost';
import usePost from '../hooks/usePost';

const Explanation = () => {
	return (
		<div className='p-6 text-white flex flex-col gap-2'>
			<h1 className='text-3xl font-bold underline text-yellow-100'>
				Post, Comments
			</h1>
			<p>
				This page shows how to fetch a single post using{' '}
				<code className='text-yellow-500'>useQuery</code> hook. Comments are
				fetched incrementally using{' '}
				<code className='text-yellow-500'>useInfiniteQuery</code> hook and added
				with <code className='text-yellow-500'>useMutation</code> hook.
			</p>
		</div>
	);
};

const ViewPost = () => {
	const params = useParams();
	const navigate = useNavigate();
	const {
		data: post,
		isLoading,
		isError,
		error,
	} = usePost(params?.id as string);
	const { onPostDelete } = useDeletePost(['posts']);

	const queryClient = useQueryClient();

	const onEditPost = () => navigate(`/post/${params?.id}/edit`);

	const onDeletePost = () => {
		if (!params?.id) return;
		onPostDelete(+params?.id, () => {
			queryClient.invalidateQueries({
				predicate: ({ queryKey }: any) =>
					queryKey[0] === 'posts' ||
					(queryKey[0] === 'post' &&
						+queryKey[1].id === +(params?.id as string)),
			});
			navigate('/posts', { replace: true });
		});
	};

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading: isCommentsLoading,
	} = useComments(+(params?.id as string));

	const { mutateAsync: addComment } = useAddComment(params?.id as string);

	return (
		<div className='m-auto flex flex-col max-w-2xl pb-7'>
			<Explanation />

			{isLoading && (
				<div className='min-h-12 flex w-full items-center justify-center'>
					<Loader width='48' height='48' />
				</div>
			)}

			{isError && (
				<div className='text-red-500 text-center w-full'>
					{error?.message ?? 'Something went wrong'}
				</div>
			)}

			{!isError && post && (
				<div className='flex flex-col gap-1 w-full'>
					<header className='flex items-center justify-between'>
						<h4 className='text-2xl font-semibold pl-6'>
							Viewing Post :{' '}
							<strong className='text-orange-300'>{post.id}</strong>
						</h4>
						<Link
							to='/posts/'
							className='pr-6 rounded-lg underline text-purple-400'
						>
							Back to Posts
						</Link>
					</header>
					<div className='p-6'>
						<Post post={post} onEdit={onEditPost} onDelete={onDeletePost} />
					</div>
				</div>
			)}

			<CommentSection
				pages={data?.pages || []}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				onAddComment={addComment}
				postId={params?.id as string}
				isLoading={isCommentsLoading}
			/>
		</div>
	);
};

export default ViewPost;
