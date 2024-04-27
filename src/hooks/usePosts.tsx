import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { PaginatedResponse } from '../types';
import { Post } from '../types/post';

const fetchPostsPaginated = async (page: number, signal: AbortSignal) => {
	try {
		// if (id > 10) throw new Error('Posts not found');
		const res = await api.get(`/posts?_page=${page}`, { signal });
		return res.data as PaginatedResponse<Post>;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const usePosts = (page: number) => {
	return useQuery<PaginatedResponse<Post>>({
		queryKey: ['posts', { page }],
		queryFn: ({ signal }) => fetchPostsPaginated(page, signal) as any,
		placeholderData: keepPreviousData,
		staleTime: 1000 * 10,
	});
};
