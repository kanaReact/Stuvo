import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Guidance(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        d="M8 16a8 8 0 118-8 8 8 0 01-8 8zm0-1.455A6.545 6.545 0 101.455 8 6.546 6.546 0 008 14.545zM8 5.09a.727.727 0 11.727-.727.727.727 0 01-.727.728zm-.727 1.819a.728.728 0 011.455 0v4.727a.728.728 0 11-1.455 0z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Guidance
