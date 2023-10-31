const resp = (s: number, m: unknown) => ({
	status: s,
	message: typeof m == "string" ? { message: m } : m,
});

export default resp;
