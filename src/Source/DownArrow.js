import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DownArrow(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={9.35}
            height={5.493}
            viewBox="0 0 9.35 5.493"
            {...props}
        >
            <Path
                d="M4.677 3.647l-3.5-3.5a.513.513 0 00-.723 0L.148.453a.512.512 0 000 .723l4.165 4.165a.516.516 0 00.726 0L9.2 1.183a.512.512 0 000-.723L8.894.154a.512.512 0 00-.723 0z"
                fill="#888"
            />
        </Svg>
    )
}

export default DownArrow
