import React from 'react'
import Contact from './Contact'
import '../css/bootstrap.min.css'
import './css/style.css'
import { db } from '../firebase'
import { AuthContext } from '../Auth'
import { User } from '../User'


class Contacts extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props)

        this.state = {
            friends: [],
        }
    }

    componentDidMount() {
        this.fetchContacts()
    }

    fetchContacts() {
        const currentUser = this.context.currentUser
        const friendsCollection = db.collection("users")
            .doc(currentUser.id)
            .collection("friends")

        let friendsCopy = this.state.friends.slice()

        friendsCollection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const friendId = doc.id
                const friendDoc = db.collection("users")
                    .doc(friendId) // user id

                friendDoc.get().then((doc) => {
                    if (doc.exists) {
                        const user = new User(friendId, doc.data().email)
                        //console.log(user)
                        friendsCopy.push(user)
                        this.setState({ friends: friendsCopy })
                    }
                }).catch((err) => {
                    console.log("couldn't find friend with id: " + friendId + " (" + err + ")")
                })
            })
        })
    }

    render() {
        return (
            <div className={`row sideBar`}>
                {this.state.friends.map((friend) => {
                    return <Contact key={friend.id} user={friend} />
                })}
            </div>
        )
    }
}

export default Contacts