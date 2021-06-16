import React from 'react';

function Button(props) {
    let {color, value, handleClick} = props;

    return (
        <button className={`ui inverted ${color} button`}
              onClick={handleClick} >
        Get {value} apple!
      </button>
    )
}

export default Button;