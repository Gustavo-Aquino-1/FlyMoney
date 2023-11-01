interface IExpense {
	id?: number;
	title: string;
	paymentType: string;
	price: number;
	date?: Date;
	userId: number;
}

export default IExpense;
