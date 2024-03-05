import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5030"
});


export async function apiRequests(method: string, url: string, data?: any, token?: string) {
	let headers = {};
	if (token) {
		headers = {Authorization: `Bearer ${token}`};
	}
	const response = await api({
		method,
		url,
		data,
		headers
	})
	.then((res) => {
		if(!res.data && method.toLowerCase() !== 'delete') {
			throw new Error("Empty Data");
		}
		return res.data;
	})
	.catch((error) => {
		if (error.response && error.response.data) {
			const errorMessage = error.response.data;
			return { errorMessage };
		} else {
			console.log(error.message); // Caso não haja uma resposta de erro definida
			return { errorMessage: error.message };
		}
	});
	return response;
}
