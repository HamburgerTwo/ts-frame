import request from '../core/request'

export const getPointRand = (pageNum: Number, itemCount: Number) => {
    return request.post<Array<{
        "rank": number,
        "clerkId": number,
        "memberName": string,
        "orgName": string,
        "p2name": string,
        points: number
    }>>('/yygj/service/getPointsRank', { pageNum, itemCount })
}