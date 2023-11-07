import {IFriend} from "../../interfaces"

export const findFriendUsername = (email: string, friends: IFriend[]) => {
    const fullFriendUser = friends.find((friend) => friend.email === email)
    console.log(friends)
    return fullFriendUser
}
