import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SideBar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={13.556}
      viewBox="0 0 18 13.556"
      {...props}
    >
      <Path
        data-name="icons/filter-dark"
        d="M.818 13.556A.755.755 0 010 12.778.755.755 0 01.818 12h16.364a.755.755 0 01.818.778.755.755 0 01-.818.778zm0-6A.755.755 0 010 6.778.754.754 0 01.818 6h16.364a.754.754 0 01.818.778.755.755 0 01-.818.778zm0-6A.754.754 0 010 .778.755.755 0 01.818 0h16.364A.755.755 0 0118 .778a.754.754 0 01-.818.778z"
      />
    </Svg>
  )
}

export default SideBar
