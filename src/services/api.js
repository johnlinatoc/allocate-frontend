export default {
  login: (loginData) => {
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }

    return fetch('http://localhost:3000/auth', reqObj)
      .then(res => res.json())
  },


  signup: (loginData) => {
    console.log(loginData)
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }

    return fetch('http://localhost:3000/current_user', reqObj)
      .then(res => res.json())
  },

  currentUser: (token) => {
    const reqObj = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    return fetch('http://localhost:3000/profile', reqObj)
    .then(resp => resp.json())
  }
}
