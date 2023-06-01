import React from "react";
import {useArray, useMount} from "../../utils";

export const TsReactTest = () => {
    const persons: {name: string; age: number}[] = [
        {name: "Jack", age: 25},
        {name: "Kun", age: 22}
    ]

    const {value, clear, add, removeIndex} = useArray(persons);

    useMount(() => {
        //console.log(value.intx)
    })

    return (
        <div>
            <button onClick={() => add({name: "Alex", age: 28})}>add join</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button onClick={() => clear()}>clear</button>
            {
                value.map((item, index) => (
                    <div key={index}>
                        <span>{index}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{item.name}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{item.age}</span>
                    </div>
                ))
            }
        </div>
    )
}
