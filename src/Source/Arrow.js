import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Arrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={9.474}
      height={11}
      viewBox="0 0 9.474 11"
      {...props}
    >
      <Path
        data-name="Polygon 1"
        d="M7.984 4.635a1 1 0 010 1.73l-6.482 3.763a1 1 0 01-1.5-.865V1.737a1 1 0 011.5-.865z"
        fill="#919191"
      />
    </Svg>
  )
}

export default Arrow
