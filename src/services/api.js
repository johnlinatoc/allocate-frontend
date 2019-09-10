const URL = `http://localhost:3000`

export default {
  login: loginData => {
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    };

    return fetch(`${URL}/auth`, reqObj).then(res => res.json());
  },

  signup: loginData => {
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    };

    return fetch(`${URL}/users`, reqObj)
      .then(res => res.json())
      .catch(err => console.error(err));
  },

  currentUser: token => {
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    return fetch(`${URL}/profile`, reqObj).then(resp =>
      resp.json()
    );
  },

  postBudget: userInput => {
    const reqObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    };
    return fetch(`${URL}/expenses`, reqObj).then(res =>
      res.json()
    );
  },

  fetchMonth: userId => {
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    return fetch(`${URL}/users/${userId}/months`, reqObj).then(
      resp => resp.json()
    );
  },

  fetchCategories: userId => {
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    return fetch(
      `${URL}/users/${userId}/categories`,
      reqObj
    ).then(resp => resp.json());
  },

  fetchExpenses: userId => {
    const reqObj = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    return fetch(
      `${URL}/users/${userId}/expenses`,
      reqObj
    ).then(resp => resp.json());
  },

  
};
