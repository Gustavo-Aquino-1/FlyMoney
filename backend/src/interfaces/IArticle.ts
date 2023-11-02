interface IArticle {
	id?: number;
	userId: number;
	title: string;
	context: string;
	link: string;
	category: string;
	createdAt?: Date;
}

export default IArticle;
