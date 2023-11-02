import { ModelStatic } from "sequelize";
import Article from "../database/models/Article";
import resp from "../utils/resp";
import IArticle from "../interfaces/IArticle";
import schema from "./validations/schema";

export default class ArticleService {
	private model: ModelStatic<Article> = Article;

	async create(data: IArticle, userId: number, userRole: string) {
		if (userRole != "admin") return resp(401, "unauthorized");

		data.userId = userId;
		data.link = data.link || "no_link";

		const { error } = schema.articleSchema.validate(data);
		if (error) return resp(400, error.message);

		data.createdAt = new Date();

		const article = await this.model.create({ ...data });
		return resp(201, article);
	}

	async update(data: IArticle, articleId: number, userId: number) {
		const article = await this.model.findByPk(articleId);
		if (!article) return resp(404, "article not found");
		if (article.userId != userId) return resp(401, "unauthorized");

		data.userId = userId;

		const { error } = schema.articleSchema.validate(data);
		if (error) return resp(400, error.message);

		await this.model.update({ ...data }, { where: { id: +articleId } });

		return resp(204, null);
	}
}
