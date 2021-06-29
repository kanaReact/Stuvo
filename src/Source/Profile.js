import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Profile(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 11.611 12.917"
      {...props}
    >
      <G
        data-name="My Profile"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.167}
      >
        <Path
          data-name="Path 3094"
          d="M11.028 12.333v-1.306a2.611 2.611 0 00-2.611-2.611H3.194a2.611 2.611 0 00-2.611 2.611v1.306"
        />
        <Path
          data-name="Path 3095"
          d="M8.417 3.194A2.611 2.611 0 115.806.583a2.611 2.611 0 012.611 2.611z"
        />
      </G>
    </Svg>
  )
}

export default Profile
