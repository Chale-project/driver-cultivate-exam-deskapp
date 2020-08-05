import request from '@/utils/request'

/**
 * 首页数据
 */
// 获取广告图
export const getBannerData = (params) => request.post('driver/marketing/advert/queryAdvert?limit=' + params.limit + '&advertGroupCode=' + params.advertGroupCode)

/**
 * 题库
 */
// 获取试用题库
export const getTestExamData = (params) => request.post('driver/questions/question/queryByTrialMap', params)

// 付费题库分类
export const getExamSortData = (params) => request.post('driver/questions/questionType/list', params)

// 付费题库列表
export const getExamData = (params) => request.post('driver/questions/questionTypeRalation/queryByTypeCodeAndQuestionTypeNewOther', params)
