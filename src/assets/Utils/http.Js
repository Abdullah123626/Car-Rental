import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export default function serverRequestHandler(endPoint, reqType, body) {
  const token = localStorage.getItem("Token") || null;
  const headers = {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const url = BASE_URL + endPoint;

  return new Promise(async (resolve, reject) => {
    try {
      let apiresponse;
      if (reqType === "get") {
        apiresponse = await axios.get(url, { headers });
      } else if (reqType === "post") {
        apiresponse = await axios.post(url, body, { headers });
      } else if (reqType === "put") {
        apiresponse = await axios.put(url, body, { headers });
      } else if (reqType === "delete") {
        apiresponse = await axios.delete(url, { headers });
      }

      const raw = apiresponse.data;
      const result = raw?.data;
      if (result === undefined || result === null) {
        resolve(raw);
      } else {
        resolve(Array.isArray(result) ? result : result?.data ?? result);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
      reject(error?.response?.data || error?.message);
    }
  });
}
