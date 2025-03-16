import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
    text: string;
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

function Button(props: ButtonProps) {
    const { text, type } = props;
    return <button type={type}>{text}</button>;
}

export default Button;
