import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import api from '../lib/axios';
import { Post } from '../types/post';

const editPost = async (data: any) => {
	try {
		// if (+id > 10) throw new Error('Post not found');
		const res = await api.put('/posts/' + data.id, data);
		return res.data as Post;
	} catch (error) {
		return Promise.reject(error);
	}
};
const useEditPost = (postId: string) => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, ...rest } = useMutation({
		mutationFn: editPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post', { id: postId }] });
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	const onEditPost = useCallback(
		async (data: any, cb: () => void) => {
			await mutateAsync(data);
			cb?.();
		},
		[mutateAsync],
	);
	return { onEditPost, isPending, ...rest };
};

export default useEditPost;
