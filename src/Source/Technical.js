import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Technical(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 14.67 14.67"
      {...props}
    >
      <Path
        data-name="Technical Support"
        d="M14.085 9.585a1.5 1.5 0 01-1.5 1.5h-9l-3 3v-12a1.5 1.5 0 011.5-1.5h10.5a1.5 1.5 0 011.5 1.5z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.17}
      />
    </Svg>
  )
}

export default Technical
