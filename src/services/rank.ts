import request from '../core/request'

export const getPointRand = (pageNum: Number, itemCount: Number) => {
    return request.post<Array<{
        rank: number,
    memberName: string,
    orgName: string,
    districtName: string,
    chainName: string,
    points: number,
    }>>('/yygj/service/getPointsRank', { pageNum, itemCount })
}
