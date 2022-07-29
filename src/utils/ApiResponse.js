import axios from "axios";
import { server_url } from "./url";

export const ApiResponse = (method, url, body) => {
  url = server_url + url;
  return new Promise((resolve, reject) => {
    const config = {};

    if(localStorage.getItem("accessToken")){
      config.headers = {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    }

    if (method === "post") {
      axios
        .post(url, body, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    } else {
      if(body){
        config.params = body.params;
      }
      axios
        .get(url, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    }
  });
};
