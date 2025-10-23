import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice.ts"
import { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

export const handleServerError = (error: unknown, dispatch: Dispatch) => {
  //let messageErr

  if (isAxiosError(error)){
    dispatch(setAppErrorAC({ error: error.response?.data?.message || error.message }))
  } else if (error instanceof Error) {
    dispatch(setAppErrorAC({ error: `Native error: ${error.message}` }))
  } else {
    dispatch(setAppErrorAC({ error: 'Something went wrong' }))  //JSON.stringify(error)
  }

  dispatch(setAppStatusAC({ status: "failed" }))
}
