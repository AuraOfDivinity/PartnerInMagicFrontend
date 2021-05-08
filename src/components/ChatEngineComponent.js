import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed'
import React from 'react'

const projectID = '20ab33de-b351-49f8-8fe3-4e5d850e8a93';

export default function ChatEngineComponent() {
    return (
        <ChatEngine
            height="100vh"
            projectID={projectID}
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
    )
}
