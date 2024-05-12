"use client";

import { Button, ButtonProps, styled } from "@mui/material";
import tokens from "@/app/style.tokens";

export default styled(Button)<ButtonProps>(() => ({
    fontWeight: "bold",
    color: tokens.coloring.dark.self,
    backgroundColor: tokens.coloring.main.self,
    "&:hover": {
        backgroundColor: tokens.coloring.main.dim,
    },
}));
