import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactElement, ReactNode } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/ban-types  */

export const isFunction = (obj: unknown): obj is Function =>
  typeof obj === 'function'

type LoadingFunction = () =>
  | ReactElement<any, any>
  | ReactElement<any, any>[]
  | ReactNode
  | ReactNode[]
  | null
type SuccessFunction<Data> = (
  data: Data
) =>
  | ReactElement<any, any>
  | ReactElement<any, any>[]
  | ReactNode
  | ReactNode[]
  | null
type ErrorFunction<Error> = (
  error: Error
) =>
  | ReactElement<any, any>
  | ReactElement<any, any>[]
  | ReactNode
  | ReactNode[]
  | null

type Props<Data, Error> = {
  query: UseQueryResult<Data, unknown>
  onPending?: ReactNode | LoadingFunction
  onSuccess: ReactNode | SuccessFunction<Data>
  onError?: ReactNode | ErrorFunction<Error>
}

export const AsyncView = <Data, Error>({
  query,
  onPending,
  onError,
  onSuccess,
}: Props<Data, Error>) => {
  const { status, data, error } = query

  if (status === 'pending') {
    return isFunction(onPending) ? onPending() : <>{onPending}</>
  }

  if (status === 'error') {
    return isFunction(onError) ? onError(error as Error) : <>{onError}</>
  }

  return isFunction(onSuccess) ? onSuccess(data) : <>{onSuccess}</>
}
