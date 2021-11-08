import React from "react";
interface Props {
    message: string;
    open: boolean;
    type: string;
}

export function Alert(props: Props) {
    return <div className={`alert ${props.type != "success" ? "error" : 'success'} ${props.open ? "show" : ""}`}>
        <p>{props.message}</p>
    </div>
}

