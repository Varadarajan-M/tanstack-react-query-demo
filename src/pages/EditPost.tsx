import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import PostForm from '../components/PostForm';
import useEditPost from '../hooks/useEditPost';
import usePost from '../hooks/usePost';

const Explanation = () => {
	return (
		<div className='p-6 text-white flex flex-col gap-2'>
			<h1 className='text-3xl font-bold underline text-yellow-100'>
				Post fetch & autofill, Update
			</h1>
			<p>
				This page shows how to fetch a single post using{' '}
				<code className='text-yellow-500'>useQuery</code> hook and update the
				post with <code className='text-yellow-500'>useMutation</code> hook.
			</p>
		</div>
	);
};

const EditPost = () => {
	const params = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = usePost(params?.id as string);

	const { onEditPost: editPost, isPending } = useEditPost(params?.id as string);

	const onEditPost = async (data: any) => {
		await editPost(data, () => {
			navigate('/posts/');
		});
	};

	return (
		<div className='m-auto flex flex-col items-center max-w-2xl'>
			<Explanation />

			{isLoading && (
				<div className='min-h-12 flex justify-center items-center'>
					<Loader width='48' height='48' />
				</div>
			)}

			{isError && (
				<div className='text-red-500 text-center w-full'>
					{error?.message ?? 'Something went wrong'}
				</div>
			)}

			{data && (
				<div className='flex flex-col gap-1 w-full'>
					<header className='flex items-center justify-between'>
						<h4 className='text-2xl font-semibold pl-6'>
							Edit Post : <strong className='text-orange-300'>{data.id}</strong>
						</h4>
						<Link
							to='/posts/'
							className='pr-6 rounded-lg underline text-purple-400'
						>
							Back to Posts
						</Link>
					</header>

					<PostForm
						defaultValues={data as unknown as any}
						onSubmit={onEditPost}
						formDisabled={isPending}
					/>
				</div>
			)}
		</div>
	);
};

export default EditPost;
