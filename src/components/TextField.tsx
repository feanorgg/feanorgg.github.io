import React, { forwardRef, useRef } from "react";
import "./TextField.scss";

export const TextField = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
    return(
        <input
            className="TextField"
            {...props}
            ref={ref}
        />
    );
});

export function SearchTextField(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const inputRef = useRef<HTMLInputElement>(null);

    return(
        <div className="SearchTextField" onClick={() => inputRef.current?.focus()}>
            <img src="/icons/search.svg" />
            <input
                {...props}
                ref={inputRef}
            />
            {props.value === "" && props.placeholder !== "" && <p className="placeholder">{props.placeholder}</p>}
        </div>
    );
}
