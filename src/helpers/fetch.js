const baseUrl = process.env.REACT_APP_API_URL;

//Function when we need to call an endpoint without authentication (Login/Register)
const fetchNoToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/login
  if (method === "GET") return fetch(url);
  else {
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
};

//Function when we need to call an endpoint with authentication
const fetchToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/login
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: { "x-token": token },
    });
  } else {
    return fetch(url, {
      method,
      headers: { "Content-Type": "application/json", "x-token": token },
      body: JSON.stringify(data),
    });
  }
};

//Another way to export, we could have used: export const fetchToken ...
export { fetchNoToken, fetchToken };
