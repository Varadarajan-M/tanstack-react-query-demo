export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
}

export interface PostComment {
	id: number;
	body: string;
	postId: number;
	user: {
		id: number;
		username: string;
	};
}
