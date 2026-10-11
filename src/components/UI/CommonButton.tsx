import React from 'react';

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    className?: string;
}

function CommonButton({text, className: externalClasses = 'px-10 py-2', ...buttonProps}: CommonButtonProps) {
    return (
        <button
            {...buttonProps}
            className={`${externalClasses} rounded-lg bg-active text-base text-white outline-1 -outline-offset-1 outline-active duration-100 hover:bg-active/85 disabled:bg-white disabled:text-black disabled:outline disabled:hover:bg-white`}
        >
            {text}
        </button>
    );
}

export default CommonButton;
