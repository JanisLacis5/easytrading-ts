import {IUserSingleLayout} from "../../../../interfaces"
import {useAppSelector} from "../../../../store/storeHooks"

export const defaultScreenerSize: IUserSingleLayout = {
    screener: "",
    x: 0,
    y: 0,
    height: (240 / layoutsMainHeight) * 100,
    width: (400 / layoutsMainWidth) * 100,
}
