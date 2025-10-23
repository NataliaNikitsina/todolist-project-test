import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"

export const handleAppError = (dispatch:Dispatch, data:any) => {
  const error = data.messages.length ? data.messages[0] : 'Something went wrong.'
  dispatch(setAppErrorAC({ error}))
  dispatch(setAppStatusAC({ status: "failed" }))
}