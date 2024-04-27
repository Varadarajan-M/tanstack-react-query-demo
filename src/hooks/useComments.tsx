import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { PaginatedResponse } from '../types';
import { PostComment } from '../types/post';

const fetchCommentsPaginated = async ({
	pageParam,
	signal,
	postId,
}: {
	pageParam: number;
	signal: AbortSignal;
	postId: number;
}) => {
	try {
		// if (id > 10) throw new Error('Posts not found');
		const res = await api.get(`/comments?postId=${postId}&_page=${pageParam}`, {
			signal,
		});
		return res.data as PaginatedResponse<PostComment>;
	} catch (error) {
		return Promise.reject(error);
	}
};

const useComments = (postId: number) => {
	return useInfiniteQuery({
		queryKey: ['post_comments', { postId }],
		queryFn: ({ pageParam, signal }) =>
			fetchCommentsPaginated({ pageParam, signal, postId }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage?.next,
		staleTime: 1000 * 10,
	});
};

export default useComments;
