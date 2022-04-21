import axios from "axios";
import {DEFAULT_URL_FOR_FILE} from "../components/APIList"

export const AuthRequest = async (payload) => {
  const { status, data: authorization } = await axios.post(
    `${DEFAULT_URL_FOR_FILE}/auth/employee/`,  payload
  )
  if (status !== 200) {
    throw new Error("no status 200")
  }
  if (!authorization) {
    throw new Error("no token found")
  }
  return authorization
}
