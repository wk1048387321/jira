import React, {Fragment} from "react";
import {Raw} from "../types";
import {Select} from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value'|'onChange'|'options'> {
    value: Raw | undefined | null,
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?: {name: string, id: number}[]
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number｜undefined 类型
 * 当 isNaN(Number(value)) 为true时，代表选择默认类型
 * 当选择默认类型时，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props;

    return <Fragment>
        <Select
            {...restProps}
            value={toNumber(value)}
            onChange={value => onChange(toNumber(value) || undefined)}
        >
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
            }
        </Select>
    </Fragment>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);
