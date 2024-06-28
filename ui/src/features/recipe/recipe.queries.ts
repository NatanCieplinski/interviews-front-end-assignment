import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '../../config/axios'
import { flatObjToSerializableUrlParams } from '../../utils'
import { RecipeListRequest, RecipeListResponse } from './recipe.types'

const getRecipeList = async (params: RecipeListRequest) => {
  const response = await axiosInstance.get<
    unknown,
    AxiosResponse<RecipeListResponse>
  >(
    `/recipes?${new URLSearchParams(flatObjToSerializableUrlParams(params)).toString()}`
  )
  return response.data
}

export const useRecipeList = ({
  _page = 0,
  _limit = 50,
  ...filter
}: RecipeListRequest) =>
  useQuery({
    queryKey: ['recipe-list', { _page, _limit, ...filter }],
    queryFn: () =>
      getRecipeList({
        _page,
        _limit,
        ...filter,
      }),
  })
