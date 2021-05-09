import React from 'react'
import '../css/bootstrap.min.css'
import ChatHeader from './ChatHeader'
import Conversation from './Conversation'
import ReplyBar from './ReplyBar'
import './css/style.css'
import FilterableContacts from './FilterableContacts'

const ChatApp = () => {
    return (
        <div className={`container app`}>
            <div className={`row app-one`}>
                <div className={`col-sm-4 side`}>
                    <div className={`side-one`}>
                        <FilterableContacts />
                    </div>
                </div>
                <div className={`col-sm-8 conversation`}>
                    <ChatHeader />
                    <Conversation />
                    <ReplyBar />
                </div>
            </div>
        </div>
    )
}

export default ChatApp