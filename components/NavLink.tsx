/** @jsxImportSource @emotion/react */
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { css } from "@emotion/react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import tokens from "@/app/style.tokens";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface IBaseNavLink {
    text: string;
    icon: IconDefinition;
    section?: true;
    child?: true;
}
interface INormalNavLink extends IBaseNavLink {
    href: string;
    isSoon?: null;
    pages?: null;
}
interface ISoonNavLink extends IBaseNavLink {
    href?: null;
    isSoon: true;
    pages?: null;
}
interface IDropdownNavLink extends IBaseNavLink {
    href: string;
    isSoon?: null;
    pages: Array<INormalNavLink | ISoonNavLink>;
}

export type INavLink = INormalNavLink | ISoonNavLink | IDropdownNavLink;

export default function NavLink({ text, icon, href, isSoon, pages, child }: INavLink) {
    const router = useRouter();
    const path = usePathname();

    const isActive = href && path.split("#")[0] === href;

    const [dropdownActive, setDropdownActive] = React.useState(false);
    const [dropdownActivated, setDropdownActivated] = React.useState(false);

    const styling = child
        ? css`
              color: ${tokens.coloring.light};
              font-size: 14px;
              font-weight: 500;
              padding: 0.2rem 2rem 0.2rem 1rem;
              display: flex;
              align-items: center;
              column-gap: 0.25rem;
              user-select: none;
              cursor: pointer;
              &:hover {
                  background-color: ${tokens.coloring.main.dim};
              }
          `
        : isActive || dropdownActive
          ? css`
                color: ${tokens.coloring.main.self};
                font-size: 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                column-gap: 0.25rem;
                user-select: none;
                ${pages && "cursor: pointer"}
            `
          : css`
                color: ${tokens.coloring.light};
                font-size: 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                column-gap: 0.25rem;
                user-select: none;
                cursor: pointer;
                &:hover {
                    color: ${tokens.coloring.main.self};
                }
            `;

    return pages ? (
        <div
            onMouseLeave={() => {
                if (!dropdownActivated) {
                    setDropdownActive(false);
                }
            }}
            // onClick={() => {
            //     setDropdownActivated(!dropdownActivated);
            // }}
        >
            <div
                style={{ marginTop: "0.75rem" }}
                css={styling}
                onMouseEnter={() => {
                    setDropdownActive(true);
                }}
            >
                <FontAwesomeIcon icon={icon} fixedWidth />
                <span style={{ paddingTop: "0.25rem" }}>{text}</span>
                <FontAwesomeIcon icon={dropdownActive ? faCaretUp : faCaretDown} />
            </div>
            <div style={{ position: "relative", paddingTop: "0.75rem", zIndex: "1000000" }}>
                <div
                    style={{
                        backgroundColor: tokens.coloring.dark.dim,
                        position: "absolute",
                        display: dropdownActive ? "grid" : "none",
                        width: "max-content",
                        rowGap: "0.75rem",
                        padding: "0.75rem 0",
                        borderRadius: "0.25rem",
                    }}
                >
                    {pages.map((p) => (
                        <NavLink {...p} child />
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div
            css={styling}
            onClick={() => {
                if (isSoon) {
                    Swal.fire({
                        icon: "info",
                        title: "Coming Soon!",
                        color: tokens.coloring.light,
                        background: tokens.coloring.dark.self,
                        iconColor: tokens.coloring.main.self,
                        confirmButtonColor: tokens.coloring.main.self,
                    });
                } else {
                    router.push(href);
                }
            }}
        >
            <FontAwesomeIcon icon={icon} fixedWidth />
            <span style={{ paddingTop: "0.25rem" }}>{text}</span>
        </div>
    );
}
