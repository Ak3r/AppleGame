import React from 'react';

function MachineField(props) {
    let { machineScore, machineArray} = props;

    return  <div>
        <p>Number of machine apples: {machineScore}</p>
        <p>{machineArray.join(", ")}</p>
    </div>
}

export default MachineField;