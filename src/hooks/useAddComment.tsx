import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { PostComment } from '../types/post';

const addComment = async (data: any, postId: number) => {
	const comment: Omit<PostComment, 'id'> = {
		body: data,
		postId: postId,
		user: {
			id: 1,
			username: 'user1',
		},
	};
	try {
		const res = await api.post('/comments', comment);
		return res.data as PostComment;
	} catch (error) {
		return Promise.reject(error);
	}
};

const useAddComment = (postId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { content: string; postId: number }) =>
			addComment(data.content, data.postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				predicate: ({ queryKey }: any) =>
					queryKey[0] === 'post_comments' && queryKey[1].postId === +postId,
			});
			toast.success('Comment added successfully');
		},
	});
};

export default useAddComment;
