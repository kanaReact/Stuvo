import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabSurvey(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 22 24"
      {...props}
    >
      <Path
        d="M19.708 0H2.292A2.4 2.4 0 000 2.5v19A2.4 2.4 0 002.292 24h17.416A2.4 2.4 0 0022 21.5v-19A2.4 2.4 0 0019.708 0zM13.75 19H4.583v-3h9.167zm3.667-5.5H4.583v-3h12.834zm0-5.5H4.583V5h12.834z"
        fill="rgba(255,255,255,0.75)"
      />
    </Svg>
  )
}

export default TabSurvey
