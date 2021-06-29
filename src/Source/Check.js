import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  G,
  Path,
} from "react-native-svg"

function Check(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__b"
          x2={1}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#0e57ce" />
          <Stop offset={0.267} stopColor="#4f51d6" />
          <Stop offset={0.513} stopColor="#844ddc" />
          <Stop offset={0.724} stopColor="#aa4ae1" />
          <Stop offset={0.894} stopColor="#c148e3" />
          <Stop offset={1} stopColor="#ca48e5" />
        </LinearGradient>
        <LinearGradient
          id="prefix__a"
          y1={0.5}
          x2={1}
          y2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={0.448} stopColor="#eaeaea" />
          <Stop offset={1} stopColor="#ccc" />
        </LinearGradient>
        <LinearGradient
          id="prefix__c"
          x1={0.5}
          y1={-0.024}
          x2={0.5}
          y2={0.962}
          xlinkHref="#prefix__a"
        />
      </Defs>
      <Circle
        data-name="Ellipse 41"
        cx={24}
        cy={24}
        r={24}
        fill="url(#prefix__b)"
      />
      <G data-name="Group 7">
        <Path
          data-name="Path 81"
          d="M257.877 422.127h-11.549l-3.726 6.309 9.593 10 9.593-10zm-13.336 6.315l2.973-4.818h9.215l3.121 4.818-7.654 7.978z"
          transform="translate(-232.602 -405.127)"
          fill="url(#prefix__a)"
        />
        <Path
          data-name="Path 82"
          d="M449.29 422.127h-11.549l-3.727 6.309 9.593 10 9.593-10zm-13.336 6.315l2.973-4.818h9.215l3.121 4.818-7.654 7.978z"
          transform="translate(-414.911 -405.127)"
          fill="url(#prefix__a)"
        />
        <Path
          data-name="Path 83"
          d="M337.533 428.436l3.727-6.309h11.548l3.911 6.309-9.593 10z"
          transform="translate(-323.018 -405.126)"
          fill="url(#prefix__a)"
        />
      </G>
    </Svg>
  )
}

export default Check
