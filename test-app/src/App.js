import './App.css'
import {useEffect, useState} from 'react'
function App() {
  
  const API_URL = 'https://ancient-taiga-31359.herokuapp.com/api/houses';
  const [users, setBid] = useState([])
  document.body.style.backgroundColor = "lightblue";
  const [setBidAndContactInfo] = useState('')
  const [ setUpdatedBid] = useState('')
  

  useEffect(() => {
    getUsers()
  }, [])

  function getUsers() {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => {
        setBid(data)
        console.log(data)
      })
  }

  function deleteBid(id) {
    fetch(API_URL + `/${id}`, {
      method: 'DELETE',
    }).then(() => getUsers())
  }

  function postBid(e) {
    e.preventDefault()
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Bid: setBidAndContactInfo,
      }),
    }).then(() => getUsers())
  }

  function updateUser(e, userObject) {
    e.preventDefault()
    
    let updatedUserObject = {
      ...userObject,
      Bid: setUpdatedBid,
    }

    fetch(`${API_URL}/${userObject.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserObject),
    }).then(() => getUsers())
  }

  return (
    <div className="App">
      <form>
        <h3>Post Bid on a property</h3>
        <label>Bid</label>
        <input onChange={(e) => setBid(e.target.value)}></input><br></br>
        <button onClick={(e) => postBid(e)}>Submit</button>
      </form>
      <br></br>

      {users.flatMap((user, index) => (
        <div className="mapContainer" key={index}>
          <div>
            Bid/Property: {user.name} <br></br>
            <button onClick={() => deleteBid(user.id)}>Delete</button>
          </div>
          <form>
            <label>Update Bid</label>
            <input
              onChange={(e) => setBid(e.target.value)}
              ></input>
              <br></br>
              <button onClick={(e) => updateUser(e, user)}>Update</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default App