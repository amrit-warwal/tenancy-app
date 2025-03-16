import { InputHTMLAttributes } from 'react';

export type LabelConfig = {
    labelText: string;
};

export type InputConfig = {
    type: InputHTMLAttributes<HTMLInputElement>['type'];
    placeholder: string;
};

export type InputProps = {
    showLabel: boolean;
    inputConfig: InputConfig;
    labelConfig: LabelConfig;
};

function Input(props: InputProps) {
    const { showLabel } = props;
    const { type, placeholder } = props.inputConfig;
    const { labelText } = props.labelConfig;
    return (
        <>
            {showLabel && <label>{labelText}</label>}
            <input type={type} placeholder={placeholder} />
        </>
    );
}

export default Input;
