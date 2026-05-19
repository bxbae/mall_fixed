// import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

//http://localhost:8080/api/todo/${tno}
export const getOne = async (tno) => {
  const res = await jwtAxios.get(`${prefix}/${tno}`);

  return res.data;
};

//http://localhost:8080/api/todo/list?page=1&size=10
export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

//http://localhost:8080/api/todo/
export const postAdd = async (todoObj) => {
  const res = await jwtAxios.post(`${prefix}/`, todoObj);

  return res.data;
};

//http://localhost:8080/api/todo/${tno}
export const deleteOne = async (tno) => {
  const res = await jwtAxios.delete(`${prefix}/${tno}`);

  return res.data;
};

//http://localhost:8080/api/todo/${tno}
export const putOne = async (todo) => {
  const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo);

  return res.data;
};
