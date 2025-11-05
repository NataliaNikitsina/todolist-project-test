import { instance } from "@/common/instance"
import { LoginInputs } from "@/features/auth/model/schema.ts"
import { BaseAuthOperationResponse, BaseMeOperationResponse } from "@/features/auth/model/types.ts"
import { BaseDefaultResponse } from "@/common/types"

export const authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseAuthOperationResponse>(`/auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseDefaultResponse>(`/auth/login`)
  },
  me(){
    return instance.get<BaseMeOperationResponse>(`/auth/me`)
  }
}