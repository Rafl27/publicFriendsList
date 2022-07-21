import './Card.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'
import App from '../App'

const Card = (props) => {

    const [listOfFriends, setListOfFriends] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/read').then((response) => {
            setListOfFriends(response.data)
        }).catch(() => {
            console.log("There has been an error")
        })
    }, [])

    const updateFriend = (id) => {
        const newAge = prompt('Enter new age:')
        axios.put("http://localhost:3001/update", {
            newAge: newAge,
            id: id
        }).then(() => { window.location.reload() })
        // .then(() => {
        //   setListOfFriends(listOfFriends.map((friend) => {
        //     return friend._id == id ? { _id: id, name: friend.name, age: newAge } : friend
        //     //after the put request is finished, I also update the list of friends state, this way I don't need to refresh the page
        //     //if the friend if being mapped is the same, then it returns a new object with the new age, else if just returns the same object
        //   }))
        // })
    }

    const deleteFriend = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`).then(() => { window.location.reload() })
        
        // .then(
        //     setListOfFriends(listOfFriends.filter((friend) => {
        //         return friend._id != id;
        //     }))
            //above I'm using a filter because it allows me to specify which objects I want in the array
            //if the current friend id is different from the one in the URL, it will return true it will be kept
        
    }



    return (
        <div>
            <div className="card">
                <img src={`https://avatars.dicebear.com/api/bottts/${props.name}.svg`} alt='Profile pic' />
                <h1>{props.name}</h1>
                <p className="title">{props.age}</p>
                <p>{props.description}</p>
                <p><button onClick={ () => updateFriend(props.id)}>Change Age</button></p>
                <p><button className='delete-button' onClick={() => deleteFriend(props.id)}><AiFillDelete /></button></p>
            </div>
        </div>
    )

}

export default Card