import React from 'react';

function UserField(props) {
    let { userScore, userArray} = props;

    return  <div>
        <p>Number of your apples: {userScore}</p>
        <p>{userArray.join(", ")}</p>
    </div>
}

export default UserField;