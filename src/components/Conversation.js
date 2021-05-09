import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Auth'
import { ConversationContext } from '../ConversationProvider'
import '../css/bootstrap.min.css'
import './css/style.css'
import { db } from '../firebase'
import { Msg } from '../Msg'
import Message from './Message'
import { useEffect } from 'react'
import { useState } from 'react'
import { comapreDateBySeconds } from '../HelperFunctions'

const Conversation = () => {
    const [currentConversation, setCurrentConversation] = useContext(ConversationContext)
    const { currentUser } = useContext(AuthContext)
    const [msgs, setMsgs] = useState([])

    let userId = null
    if (currentUser) {
        userId = currentUser.id
    }

    let friendId = null
    if (currentConversation) {
        friendId = currentConversation.id
    }

    // fetch msgs from a given query snapshot
    const fetchMsgs = (querySnapshot) => {
        let newMsgs = [...msgs]

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data())
            const data = doc.data()

            newMsgs.push(new Msg(data.content, data.from, data.to, data.date))
        })

        return newMsgs
    }

    // fetch msgs from firebase db
    const fetchMsgsFromFirebase = () => {
        const msgsCollectionFromUser = db.collection("msgs")
            .where("from", "==", userId)

        const msgsCollectionToUser = db.collection("msgs")
            .where("to", "==", userId)

        let msgsFrom
        let msgsTo
        Promise.all([msgsCollectionFromUser.get(), msgsCollectionToUser.get()])
            .then((values) => {
                msgsFrom = fetchMsgs(values[0])
                msgsTo = fetchMsgs(values[1])

                let newMsgs = msgsFrom.concat(msgsTo)
                newMsgs.sort(comapreDateBySeconds)
                console.log(newMsgs)
                setMsgs(newMsgs)
            })
    }

    // only fire once
    useEffect(() => {
        fetchMsgsFromFirebase()
    }, [])

    return (
        <div className={`row message`} id="conversation">
            <div className={`row message-previous`}>
                <div className={`col-sm-12 previous`}>
                    <a id="ankitjain28" name="20">
                        Show Previous Messages
                    </a>
                </div>
            </div>
            {
                msgs.map((msg, i) => {
                    let date = new Date(msg.date.seconds*1000)
                    let formattedDate = date.getHours() + ":" + date.getMinutes()
                    //let formattedDate = date.toLocaleDateString('en-US')
                    return <Message isSent={(msg.from == userId)}
                        content={msg.content}
                        time={formattedDate}
                        key={i} />
                })
            }
        </div>
    )
}

export default Conversation