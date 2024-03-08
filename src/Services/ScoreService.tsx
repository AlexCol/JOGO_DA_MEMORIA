import { IScore } from "../Interfaces/IScore";
import { apiRequests } from "./Config/Config"

const getScores = async(token: string) => {
	return apiRequests('get', '/score', null, token);
}

const newScore = async(newScore: IScore, token: string) => {
	return apiRequests('post', '/score/new', newScore, token);
}

export const scoreService = {
	getScores, newScore
}