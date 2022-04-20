import axios from "axios"

export function setHeader(header) {
  axios.defaults.headers.common = header
}

export function authHeader(token) {
  if (token) {
    return { Authorization: `${token}` }
  }
  return {}
}
