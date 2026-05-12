import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
// export default function httpRequestHandler(endpoint, reqType, body) {
//   // const cookies = new Cookies();
//   const token=localStorage.getItem("Token");

//   const baseurl = "http://localhost:5001/api/";
//   // const baseurl = "http://192.168.100.32:5001/api/";
//   // const baseurl = "http://192.168.100.20:5001/api/";
//   // const token = cookies.get("accesstoken");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',

//   };

//   const url = baseurl + endpoint;
//   let apiconfige = "";
//   return new Promise((resolve, reject) => {
//     try {
//       if (reqType === "get") {
//         apiconfige = axios.get(url, { headers });
//       } else if (reqType === "post") {
//         apiconfige = axios.post(url, body, { headers });
//       } else if (reqType === "put") {
//         apiconfige = axios.put(url, body, { headers });
//       } else if (reqType === "patch") {
//         apiconfige = axios.patch(url, body, { headers });
//       } else if (reqType === "delete") {
//         apiconfige = axios.delete(url, { headers });
//       }

//       apiconfige
//         .then((response) => {
//           resolve(response.data.data);
//         })
//         .catch((error) => {
//           console.log(error);
//           swalAlert("", error.messsage)
//           reject(error.messsage);
//         });
//     } catch (error) {

//     }
//   });
// }




// export default function httpRequestHandler(endpoint, reqType, body) {
//   console.log("In Js Function")

//   const token = localStorage.getItem("Token");//A Unique Identity  for 
//   const baseURL = `http://localhost:5000/api`;
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     'content-type': 'application/json',
//   }

//   let url = baseURL + endpoint;
//   let apiconfig = '';
//   return new Promise((resolve, reject) => {

//     try {

//       if (reqType == 'get') {
//         apiconfig = axios.get(url, { headers });
//       }
//       else if (reqType == 'post') {
//         apiconfig = axios.post(url, body ?? '', { headers });
//       }
//       else if (reqType == 'put') {
//         apiconfig = axios.put(url, body ?? '', { headers });
//       }
//       else if (reqType == 'delete') {
//         apiconfig = axios.delete(url, body ?? '', { headers });
//       }

//       apiconfig.then((response) => {
//         resolve(response.data.data);
//         swal("Promise is resolved");
//       }).catch((error) => {
//         swal("", error.message);
//       })


//     } catch (error) {


//     }


export default function serverRequestHandler(endPoint, reqType, body) {

  const token = localStorage.getItem("Token") || null;
  const headers = {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  }
  const baseUrl = `http://localhost:5000/api`;
  let url = baseUrl + endPoint;
  let apiresponse = '';
  return new Promise((reslove, reject) => {
    try {
      if (reqType == 'get') {
        apiresponse = axios.get(url, body ?? { headers }, { headers });
      }
      else if (reqType == 'post') {
        apiresponse = axios.post(url, body, { headers });
      }
      else if (reqType == 'put') {
        apiresponse = axios.put(url, body, { headers });

      }
      else if (reqType == 'delete') {
        apiresponse = axios.delete(url, body, { headers });
      }
      apiresponse.then((response) => {
        reslove(response.data.data);
      })
        .catch((error) => {
          reject(error.response.data);
          console.log("Error in catch", error);
          if (error.status??'' == 401) {
          }
        })
    } catch (error) {
    }
  })
}









   /*This will automatically , attaches the baseURL/URL with every api request,we can say instead of adding axios.get("http://localhost:500/api/product") it will work like  api api.get("/products"):Why(becase the baseLink is already attached by the instance we have made eerlier..)
       const api=axios.create({
       baseURL: 'http://localhost:5000',
       })
      2.If the server did not responsd after 10s, then it throws an error 
      const api=axios.create({
      baseURL: 'http://localhost:500';
      timeout: 10000;
      })
      the second key timeout; means the axios waits for 10s for the server to send data , if it not it throws an error
      */

       //This line say: "Hello Axios, before sending the request to the URL, please run this function :callback:parameter hay, 
    // Parameter we have in this callBack,is the actual request object which has our body,request body {method: "post",url: '/products', timeout: '', headers: {}}"
    /*Interceptors: are the middleman, just between or code and HTML request, it allows us to modify the request(link) before sending it to the server, and also allows to make modification in our code before receiving the response */