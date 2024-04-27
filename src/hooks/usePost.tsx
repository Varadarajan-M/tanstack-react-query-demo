import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { Post } from '../types/post';

export const fetchPost = async (id: string) => {
	try {
		// if (+id > 10) throw new Error('Post not found');
		const res = await api.get('/posts/' + id);
		return res.data as Post;
	} catch (error) {
		return Promise.reject(error);
	}
};

const usePost = (postId: string) => {
	return useQuery<Post>({
		queryKey: ['post', { id: postId }],
		queryFn: () => fetchPost(postId),
		retry: 2,
		enabled: !!postId,
		staleTime: 1000 * 10,
	});
};

export default usePost;
