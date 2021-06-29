import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabResult(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 25 24"
      {...props}
    >
      <Path
        d="M24.255 13.5H13.35l7.262 7.408a.727.727 0 001.02.032 11.3 11.3 0 003.361-6.6.746.746 0 00-.738-.837zm-.727-3.038A11.168 11.168 0 0013.272 0a.746.746 0 00-.772.761V11.25h10.283a.747.747 0 00.744-.788zM10.294 13.5V2.377a.742.742 0 00-.82-.753A11.259 11.259 0 0011.169 24a10.8 10.8 0 006.216-2.064.754.754 0 00.072-1.129z"
        fill="rgba(255,255,255,0.75)"
      />
    </Svg>
  )
}

export default TabResult
