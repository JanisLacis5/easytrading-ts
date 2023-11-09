export interface IUserSingleTrade {
    stock: string
    accBefore: number
    accAfter: number
    pl: number
    date: string
    time: string
    action: string
}

export interface IUserSingleNote {
    pinned: boolean
    image: string
    text: string
    id: string
}

export interface IUserSingleLayout {
    screener: string
    x: number
    y: number
    height: number
    width: number
}

export interface IUserInfo {
    email: string
    firstName: string
    lastName: string
    username: string
    startingAccount: string
    account: string
    image: string
    pricing: string
}

export interface IHodData {
    time: string
    stock: string
    price: number
    float: number
    volume: number
    relVolume: number
}

export interface IMessage {
    sender: boolean
    time: string
    date: Date
    message: string
}

export interface IFriend {
    email: string
    username: string
}

export interface IUserMessages {
    [key: string]: IMessage[]
}
