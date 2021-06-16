import React from 'react';

function Button(props) {
    let {color, value, handleClick, disabled} = props;

    return (
        <button className={`ui inverted ${color} button`}
                onClick={handleClick}
                disabled={disabled} >
        Get {value} apple!
      </button>
    )
}

export default Button;