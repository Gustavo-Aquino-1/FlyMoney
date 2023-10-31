interface IUser {
	id?: number;
	name: string;
	email: string;
	password: string;
	balance: number;
	role?: string;
}

export default IUser;
