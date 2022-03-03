import axios from 'axios';
import {CANDIDATE_LIST, DEFAULT_URL} from "@Components/APIList";

export default class ListService {
  static async getAll() {
    const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
    return data
  }
  static async getEmploy(id) {
    const {data} = await axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${id}`)
    return data
  }
}

