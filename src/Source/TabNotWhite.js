import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function TabNotWhite(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 22 24"
      {...props}
    >
      <G fill="#fff">
        <Path
          data-name="Path 3087"
          d="M10.986 24.001c2.1 0 3.246-1.485 3.246-3.577H7.729c0 2.092 1.151 3.577 3.257 3.577z"
        />
        <Path
          data-name="Path 3088"
          d="M21.721 17.286c-1.059-1.184-3.143-1.879-3.143-7.182 0-5.443-2.833-7.631-5.474-8.156-.248-.053-.426-.123-.426-.344v-.168A1.578 1.578 0 0011 0a1.574 1.574 0 00-1.678 1.435v.169c0 .216-.179.292-.426.344-2.648.531-5.474 2.713-5.474 8.156 0 5.3-2.084 5.991-3.143 7.182-.681.764-.034 1.855 1.093 1.855h19.267c1.117.001 1.763-1.096 1.082-1.855z"
        />
      </G>
    </Svg>
  )
}

export default TabNotWhite
