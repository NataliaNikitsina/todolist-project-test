import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"
import { BaseResponse } from "@/common/types"

export const handleAppError = <T> (dispatch: Dispatch, data: BaseResponse<T>) => {
  const error = data.messages.length ? data.messages[0] : "Something went wrong."
  dispatch(setAppErrorAC({ error }))
  dispatch(setAppStatusAC({ status: "failed" }))
}