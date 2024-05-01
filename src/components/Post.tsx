import { Link } from 'react-router-dom';
import { Post as PostType } from '../types/post';

import { MdDelete, MdModeEditOutline } from 'react-icons/md';

type PostProps = {
	post: PostType;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
	onInteraction?: (id: string) => void;
};

let interactionTimer: any;

const Post = ({ post, onEdit, onDelete, onInteraction }: PostProps) => {
	const onPostInteraction = () => {
		clearTimeout(interactionTimer);
		interactionTimer = setTimeout(() => {
			onInteraction?.(post.id.toString());
		}, 600);
	};

	const onPostInteractionStop = () => {
		clearTimeout(interactionTimer);
	};

	return (
		<div className='flex relative after:transition-opacity after:duration-200 after:rounded-lg after:opacity-0 hover:after:opacity-100 after:absolute group after:-inset-0.5 after:blur-[5px] after:bg-gradient-to-r after:from-purple-600 after:to-red-500'>
			<div className='p-6 transition-all duration-200 relative rounded-lg border border-opacity-100 border-purple-900 group-hover:border-opacity-0 flex flex-col gap-1 bg-dark-blue z-10'>
				<Link
					to={`/post/${post.id}`}
					onMouseEnter={onPostInteraction}
					onMouseLeave={onPostInteractionStop}
					className='peer'
				>
					<h3 className='text-xl font-bold text-orange-200 underline'>
						{post.title}
					</h3>
				</Link>
				<p>{post.body}</p>

				<div className='flex mt-auto items-center justify-between'>
					<div className='flex gap-1 mt-3'>
						{post.tags.map((tag) => (
							<span
								key={tag}
								className='inline-block bg-rose-400 bg-opacity-60 rounded-md px-2 py-1 mr-1 text-sm font-semibold text-white'
							>
								{tag}
							</span>
						))}
					</div>

					<div className='flex gap-3 mt-3 '>
						{
							<button className='group' onClick={() => onEdit?.(post.id)}>
								<MdModeEditOutline className='group-hover:text-blue-300' />
							</button>
						}
						{
							<button className='group' onClick={() => onDelete?.(post.id)}>
								<MdDelete className='text-red-300 group-hover:text-red-500 ' />
							</button>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
