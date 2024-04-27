import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchPost } from './usePost';

const usePrefetchPost = () => {
	const queryClient = useQueryClient();
	const prefetchPost = useCallback(
		(postId: string) => {
			return queryClient.prefetchQuery({
				queryKey: ['post', { id: postId }],
				queryFn: () => fetchPost(postId),
				staleTime: 1000 * 10,
			});
		},
		[queryClient],
	);

	return prefetchPost;
};

export default usePrefetchPost;
