import './Input.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [description, setDescription] = useState('')
    const [listOfFriends, setListOfFriends] = useState([])

    const addFriend = () => {
        axios.post("http://localhost:3001/addfriend", {
            name: name,
            age: age,
            description: description
        }).then(() => { window.location.reload() })
        //for now I`ll just refresh the page
        // .then((response) => {
        //     setListOfFriends([...listOfFriends, { _id: response.data._id, name: name, age: age, description: description }]) //instead of updating the page, I can also add the new friend to the array of friends at the same time
        // })
    }

    const handleKeypress = (event) => {
        if (event.keyCode === 13) {
            addFriend()
        }
    }

    return (
        <div className="inputs">
            <h1 id='title'>Public Friends List</h1>
            {/* /////////////inputs///////////// */}
            <div className='name-age'>
                <input type="text" maxLength='20' placeholder='Friend Name' id='name-input' className='friend-name' onChange={function callback(event) {
                    setName(event.target.value)

                }} />
                <input type="number" max='130' pattern="[0-9]+" placeholder='Age' className='friend-age' onChange={(event) => {
                    setAge(event.target.value)
                }} />
            </div>

            <textarea rows="2" cols="40" placeholder='Friend Description' maxLength="50" onChange={(event) => {
                setDescription(event.target.value)

            }}></textarea>

            <button onKeyPress={handleKeypress} onClick={addFriend}>Add Friend</button>
        </div>

    )
}

export default Input;