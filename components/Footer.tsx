import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import tokens from "@/app/style.tokens";

export default function footer() {
    const year = new Date(Date.now()).getFullYear();

    return (
        <footer
            style={{
                color: tokens.coloring.light,
                backgroundColor: tokens.coloring.dark.self,
                padding: "0.5rem 0",
                display: "flex",
                justifyContent: "center",
                columnGap: "0.25rem",
                userSelect: "none",
            }}
        >
            <span>STEM ENTREPRENEURSHIP CENTER | ALL RIGHTS RESERVED</span>
            <span style={{ color: tokens.coloring.main.self }}>
                <FontAwesomeIcon icon={faCopyright} />
            </span>
            <span>{year}</span>
        </footer>
    );
}
