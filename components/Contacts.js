import React from 'react'
import Contact from './Contact'
import '../css/bootstrap.min.css'
import './css/style.css'
import { db } from '../firebase'
import { AuthContext } from '../Auth'
import { User } from '../User'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const Contacts = () => {
    const { currentUser } = useContext(AuthContext)
    const [friends, setFriends] = useState([])

    const fetchContact = (doc, friendId) => {
        //console.log(doc.data())
        if (doc.exists) {
            return new User(friendId, doc.data().email)
        }
        return null
    }

    const fetchContacts = () => {
        const friendsCollection = db.collection("users")
            .doc(currentUser.id)
            .collection("friends")

        // subsricbe to real-time changes on user's friends in the db
        friendsCollection.onSnapshot((querySnapshot) => {
            let friendsCopy = friends.slice()
            let promises = []
            let ids = []
            querySnapshot.forEach((doc) => {
                const friendId = doc.id
                console.log("friend id: " + friendId)
                const friendDoc = db.collection("users")
                    .doc(friendId) // user id

                promises.push(friendDoc.get())
                ids.push(friendId)
            })
            Promise.all(promises)
                .then((values) => {
                    values.forEach((doc, i) => {
                        let fetchedContact = fetchContact(doc, ids[i])
                        if (fetchedContact != null) {
                            friendsCopy.push(fetchedContact)
                        }
                    })
                    setFriends(friendsCopy)
                })
        })
    }

    // fetch contacts on mount(?) (only called once)
    useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <div className={`row sideBar`}>
            {friends.map((friend) => {
                console.log("sdfsdfsdfs")
                console.log(friends)
                return <Contact key={friend.id} user={friend} />
            })}
        </div>
    )
}

export default Contacts