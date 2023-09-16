export interface IUserSingleTrade {
    stock: string
    accBefore: number
    accAfter: number
    pl: number
    date: string
    time: string
    action: string
}

export interface IUSerSingleNote {
    pinned: boolean
    image: string
    test: string
    id: string
}

export interface IUserSingleLayout {
    screener: string | null
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
