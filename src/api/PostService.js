import axios from "axios";

export default class PostService {
  static async getAll(size = 6, page = 0) {
    return await axios.get(`http://localhost:8082/posts?size=${size}&page=${page}`);
  }
  
  static async getById(id) {
    return await axios.get(`http://localhost:8082/posts/${id}`);
  }
  
  static async create(post) {
    return await axios.post("http://localhost:8082/posts", post);
  }
  
  static async update(post, id) {
    return await axios.put(`http://localhost:8082/posts/${id}`, post);
  }
  
  static async delete(id) {
    return await axios.delete(`http://localhost:8082/posts/${id}`);
  }
}