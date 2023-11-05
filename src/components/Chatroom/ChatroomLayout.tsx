import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import './chatroom.css'
import ChatroomRightSide from './ChatroomRightSide/ChatroomRightSide'
import { toast } from 'react-toastify'
import { updateUserField } from '../../features/userSlice'

const Chatroomlayout = () => {
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((store) => store.user)
    const { main } = useAppSelector((store) => store.chatroomRightSide)

    // NOTIFICATION SOCKET
    const notiWs = new WebSocket('ws://localhost:5000')
    notiWs.onopen = () => {
        notiWs.send(
            JSON.stringify({
                id: user.id,
            })
        )
    }
    notiWs.onmessage = ({ data }) => {
        const recData = JSON.parse(data)
        if (recData.status === 'new friend request') {
            toast.warn(recData.status)
        }
        if (recData.recievedFriendReq) {
            dispatch(
                updateUserField({
                    field: 'recievedFriendRequests',
                    value: recData.recievedFriendReq,
                })
            )
        }

        if (recData.status === 'new friend') {
            toast.warn(recData.status)
        }
        if (recData.friends) {
            dispatch(
                updateUserField({
                    field: 'sentFriendRequests',
                    value: recData.sentFriendReq,
                })
            )
            dispatch(
                updateUserField({
                    field: 'friends',
                    value: recData.friends,
                })
            )
        }

        if (recData.status === 'new message') {
            dispatch(
                updateUserField({
                    field: 'messages',
                    value: recData.updatedMessages,
                })
            )
        }
    }
    notiWs.onerror = (e) => {
        console.log('Error:')
        console.log(e)
    }

    return (
        <section className="chatroom-layout">
            <Outlet />
            {main.showRightSide && <ChatroomRightSide />}
        </section>
    )
}
export default Chatroomlayout
