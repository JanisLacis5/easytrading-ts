import { IMessage } from '../../../interfaces'
import './chatroomTexts.css'
import { FC } from 'react'

const GreenBubble: FC<{ message: IMessage }> = ({ message }) => {
    return (
        <div className="text-bubble green-text-bubble">
            <p>{message.message}</p>
            <p>{message.time}</p>
        </div>
    )
}
export default GreenBubble
