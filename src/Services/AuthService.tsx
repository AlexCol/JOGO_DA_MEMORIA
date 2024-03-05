import { apiRequests } from "./Config/Config"

const checkAuth = async(token: string) => {
	return apiRequests('get', '/auth', null, token);
}

export const authService = {
	checkAuth
}