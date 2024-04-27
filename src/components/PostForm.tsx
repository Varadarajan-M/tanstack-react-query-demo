import { useEffect, useState } from 'react';
import { Post } from '../types/post';

type PostFormProps = {
	defaultValues?: Record<keyof Omit<Post, 'id'>, string>;
	onSubmit: (post: any) => void;
	formDisabled: boolean;
};

const PostForm = ({ defaultValues, onSubmit, formDisabled }: PostFormProps) => {
	const [values, setValues] = useState(defaultValues);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({
			...values,
			tags:
				typeof values?.tags === 'string'
					? values.tags.split(',')
					: values?.tags,
			userId: Math.floor(Math.random() * 100000),
		});
	};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value } as any));
	};

	useEffect(() => {
		setValues(defaultValues);
	}, [defaultValues]);

	return (
		<form
			className='flex flex-col gap-3 p-6 text-white placeholder:text-gray-400 w-full'
			onSubmit={handleSubmit}
		>
			<label className='flex flex-col gap-1'>
				<span className='text-white font-semibold'>Title</span>
				<input
					onChange={onChange}
					name='title'
					value={values?.title}
					type='text'
					placeholder='Title'
					required
					className='bg-transparent border-purple-800 outline-none border rounded-lg px-3 py-2'
				/>
			</label>

			<label className='flex flex-col gap-1'>
				<span className='text-white font-semibold'>Body</span>
				<textarea
					onChange={onChange}
					name='body'
					value={values?.body}
					placeholder='Body'
					required
					className='outline-none
                    bg-transparent border-purple-800
                    border rounded-lg px-3 py-2 resize-none h-52'
				/>
			</label>
			<label className='flex flex-col gap-1'>
				<span className='text-white font-semibold'>Tags</span>
				<input
					onChange={onChange}
					name='tags'
					type='text'
					value={values?.tags}
					placeholder='Tags comma seperated'
					required
					className='outline-none border rounded-lg px-3 py-2 bg-transparent border-purple-800'
				/>
			</label>
			<button
				disabled={formDisabled}
				type='submit'
				className='text-white bg-blue-500 rounded-md px-3 py-2 mt-3 disabled:opacity-50'
			>
				Submit
			</button>
		</form>
	);
};

export default PostForm;
