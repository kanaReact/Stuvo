import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Edit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      {...props}
    >
      <Path
        data-name="Icon material-edit"
        d="M0 9.504v2.5h2.5l7.372-7.372-2.5-2.5zm11.805-6.809a.664.664 0 000-.94l-1.56-1.56a.664.664 0 00-.94 0l-1.22 1.22 2.5 2.5z"
        fill="#a5a5a5"
      />
    </Svg>
  )
}

export default Edit
