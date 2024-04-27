import { PostComment } from '../types/post';

type CommentProps = {
	comment: PostComment;
};

const Comment = ({ comment }: CommentProps) => {
	return (
		<div className='flex flex-col'>
			<p className='text-sm text-lime-400'>
				<strong>{comment.user.username}</strong>
			</p>
			<p className='text-md text-cyan-200'>{comment.body}</p>
		</div>
	);
};

export default Comment;
