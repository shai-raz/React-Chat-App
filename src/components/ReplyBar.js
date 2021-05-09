import React from 'react'
import '../css/bootstrap.min.css'
import './css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { AuthContext } from '../Auth';
import { ConversationContext } from '../ConversationProvider';
import { db } from '../firebase'
import { Msg } from '../Msg'
import { useRef } from 'react'

const ReplyBar = () => {
    const [currentConversation, setCurrentConversation] = useContext(ConversationContext)
    const { currentUser } = useContext(AuthContext)
    const msgContent = useRef()

    const sendMsg = () => {
        const msgToSend = new Msg(msgContent.current.value, currentUser.id, currentConversation.id, new Date())
        console.log(msgToSend)

        db.collection("msgs")
            .add({
                content: msgToSend.content,
                from: msgToSend.from,
                to: msgToSend.to,
                date: msgToSend.date
            })
    }

    return (
        <div className={`row reply`}>
            <div className={`col-sm-1 col-xs-1 centered-icon reply-emojis`}>
                <FontAwesomeIcon icon={faSmile} size="2x" />
            </div>
            <div className={`col-sm-9 col-xs-9 reply-main`}>
                <textarea className={`form-control`} rows="1" id="comment" ref={msgContent}></textarea>
            </div>
            <div className={`col-sm-1 col-xs-1 centered-icon reply-recording`}>
                <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </div>
            <div className={`col-sm-1 col-xs-1 centered-icon reply-send`}
                onClick={sendMsg}>
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </div>
        </div>
    )
}

export default ReplyBar