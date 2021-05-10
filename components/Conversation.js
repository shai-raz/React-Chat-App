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
import { useRef } from 'react'

const Conversation = () => {
    const [currentConversation, setCurrentConversation] = useContext(ConversationContext)
    const { currentUser } = useContext(AuthContext)
    const [msgsFrom, setMsgsFrom] = useState([]) // msgs sent from user (to currently active conversation)
    const [msgsTo, setMsgsTo] = useState([]) // msgs sent to user (from currently active converstation)
    const [msgs, setMsgs] = useState([])

    const conversationBottom = useRef()

    let userId = null
    if (currentUser) {
        userId = currentUser.id
    }

    let friendId = null
    if (currentConversation) {
        friendId = currentConversation.id
    }

    const scrollToBottom = () => {
        conversationBottom.current.scrollIntoView({ behavior: "auto" });
    }

    // fetch msgs from a given query snapshot
    // fromUser: true is sent from user, false if sent to user
    const fetchMsgs = (querySnapshot, fromUser) => {
        let newMsgs = []

        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data())
            const data = doc.data()

            newMsgs.push(new Msg(data.content, data.from, data.to, data.date))
        })
        if (fromUser) {
            setMsgsFrom(newMsgs)
        } else {
            setMsgsTo(newMsgs)
        }
        //return newMsgs
    }

    // fetch msgs from firebase db
    const fetchMsgsFromFirebase = () => {
        if (currentConversation) {
            const msgsCollectionFromUser = db.collection("msgs")
                .where("from", "==", userId)
                .where("to", "==", currentConversation.id)

            const msgsCollectionToUser = db.collection("msgs")
                .where("to", "==", userId)
                .where("from", "==", currentConversation.id)

            msgsCollectionFromUser.onSnapshot((querySnapshot) => {
                fetchMsgs(querySnapshot, true)
                scrollToBottom()
            })

            msgsCollectionToUser.onSnapshot((querySnapshot) => {
                fetchMsgs(querySnapshot, false)
                scrollToBottom()
            })
        }
    }

    // fetch msgs from firestore db whenever a conversation is selected
    useEffect(() => {
        fetchMsgsFromFirebase()
    }, [currentConversation])

    /* whenever from/to msgs is changed (new data from firestore)
       update the msgs state */
    useEffect(()=> {
        let newMsgs = msgsFrom.concat(msgsTo)
        newMsgs.sort(comapreDateBySeconds)
        setMsgs(newMsgs)
        scrollToBottom()
    }, [msgsFrom, msgsTo])

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
                    let date = new Date(msg.date.seconds * 1000)
                    let formattedDate = date.getHours() + ":" + date.getMinutes()
                    //let formattedDate = date.toLocaleDateString('en-US')
                    return <Message isSent={(msg.from == userId)}
                        content={msg.content}
                        time={formattedDate}
                        key={i} />
                })
            }
            <div style={{ float: "left", clear: "both", height: "0%" }} ref={conversationBottom} />
        </div>
    )
}

export default Conversation