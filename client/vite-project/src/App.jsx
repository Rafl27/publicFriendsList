
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './components/Card'
import Input from './components/Input.jsx'

function App() {
  const [listOfFriends, setListOfFriends] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/read').then((response) => {
      setListOfFriends(response.data)
      console.log(listOfFriends)
    }).catch(() => {
      console.log("There has been an error")
    })
  }, [])

  return (
    <div className="App">
      <Input />
      <div className='friends-card'>
        {listOfFriends.map((friend) => {
          return (
            <div key={friend._id}>
              <Card name={friend.name} description={friend.description} age={friend.age} id={friend._id} />
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default App
