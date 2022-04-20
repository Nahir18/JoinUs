import {setHeader, authHeader} from "../api"
import {TOKEN_KEY} from "../constants"
import axios from "axios";
import {DEFAULT_URL_FOR_FILE} from "../components/APIList"

export const AuthRequest = async (payload) => {
  const { status, data: authorization } = await axios.post(
    `${DEFAULT_URL_FOR_FILE}/auth/employee/`,  payload,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  )
  if (status !== 200) {
    throw new Error("no status 200")
  }
  if (!authorization) {
    throw new Error("no token found")
  }
  const token = authorization
  setHeader(authHeader(token))
  localStorage.setItem(TOKEN_KEY, token)
  return token
}
