import { IMessage } from '../../../interfaces'
import './chatroomTexts.css'
import { FC } from 'react'

const WhiteBubble: FC<{ message: IMessage }> = ({ message }) => {
    return (
        <div className="text-bubble white-text-bubble">
            <p>{message.message}</p>
            <p>{message.time}</p>
        </div>
    )
}
export default WhiteBubble
