import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { PaginatedResponse } from '../types';
import { Post } from '../types/post';

const deletePost = async (id: number) => {
	try {
		// if (id > 10) throw new Error('Post not found');
		const res = await api.delete(`/posts/${id}`);
		return res.data as Post;
	} catch (error) {
		return Promise.reject(error);
	}
};

const useDeletePost = (dependentQueryKey: QueryKey) => {
	const queryClient = useQueryClient();
	const { mutate, ...rest } = useMutation({
		mutationFn: deletePost,

		onMutate(id) {
			const previousData = queryClient.getQueryData(dependentQueryKey);
			console.log('previousData', previousData);
			queryClient.setQueriesData(
				{
					queryKey: dependentQueryKey,
				},
				(old?: PaginatedResponse<Post>) => {
					if (!old) return;
					return {
						...old,
						data: old.data?.filter((post: Post) => post.id !== id),
					};
				},
			);

			return { previousData };
		},
	});

	const onPostDelete = useCallback(
		async (id: number, onSuccess?: () => void, onError?: () => void) => {
			mutate(id, {
				onSuccess: () => {
					toast.success('Post deleted successfully');

					onSuccess?.();
				},
				onError(_error, _variables, context) {
					toast.error(_error.message);
					queryClient.setQueryData(
						dependentQueryKey,
						context?.previousData as PaginatedResponse<Post>,
					);
					onError?.();
				},
			});
		},
		[dependentQueryKey, mutate, queryClient],
	);

	return { onPostDelete, ...rest };
};

export default useDeletePost;
