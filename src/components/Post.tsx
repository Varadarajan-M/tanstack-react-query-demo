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
		interactionTimer && clearTimeout(interactionTimer);
		interactionTimer = setTimeout(() => {
			onInteraction?.(post.id.toString());
		}, 1000);
	};

	return (
		<div className='p-6 border rounded-lg border-cyan-100 flex flex-col gap-1'>
			<Link to={`/post/${post.id}`} onMouseEnter={onPostInteraction}>
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
	);
};

export default Post;
