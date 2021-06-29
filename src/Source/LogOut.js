import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LogOut(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        data-name="Log Out"
        d="M7.21 7.273l2.758-2.758A.727.727 0 108.94 3.486l-4 4a.727.727 0 000 1.029l4 4a.728.728 0 101.029-1.029L7.21 8.727h8.066a.728.728 0 000-1.455zm1.517-5.818a.728.728 0 100-1.455H1.821A1.82 1.82 0 000 1.821v12.358A1.821 1.821 0 001.821 16h6.906a.728.728 0 100-1.455H1.821a.366.366 0 01-.367-.366V1.821a.366.366 0 01.367-.366z"
        fill="#fff"
      />
    </Svg>
  )
}

export default LogOut
