import {IUserSingleLayout} from "../../../../interfaces"

const findEditableIndex = (
    layouts: IUserSingleLayout[][] | undefined,
    layoutToFind: IUserSingleLayout[]
) => {
    if (typeof layouts === "undefined") {
        return -1
    }
    for (let i = 0; i < layouts.length; i++) {
        if (layoutToFind.length !== layouts[i].length) {
            continue
        }

        for (let j = 0; j < layoutToFind.length; j++) {
            const {x, y, height, width, screener} = layoutToFind[j]
            if (
                layouts[i][j].x === x &&
                layouts[i][j].y === y &&
                layouts[i][j].height === height &&
                layouts[i][j].width === width &&
                layouts[i][j].screener === screener
            ) {
                return i
            }
        }
    }
    return -1
}

export default findEditableIndex
