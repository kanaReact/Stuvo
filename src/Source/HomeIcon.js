import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 11.666 12.834"
      {...props}
    >
      <Path
        d="M4.083 12.251H1.749a1.168 1.168 0 01-1.166-1.166V4.668L5.833.585l5.25 4.083v6.417a1.168 1.168 0 01-1.166 1.166H7.584V6.417h-3.5v5.833z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.167}
      />
    </Svg>
  )
}

export default HomeIcon
