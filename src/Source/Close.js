import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Close(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 13.426 13.423"
      {...props}>
      <Path
        d="M8.304 6.711l4.8-4.8A1.124 1.124 0 0011.515.327l-4.8 4.8-4.8-4.8A1.124 1.124 0 10.331 1.911l4.8 4.8-4.8 4.8a1.124 1.124 0 001.584 1.584l4.8-4.8 4.8 4.8a1.124 1.124 0 101.584-1.584z"
        fill="#fff"
        {...props}
      />
    </Svg>
  );
}

export default Close;
