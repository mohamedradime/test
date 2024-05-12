"use client";

import { useForm } from "react-hook-form";
import { Box, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import MainBtn from "@/components/MainBtn";
import { uploadData } from "./action";
import Swal from "sweetalert2";

interface IForm {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    type: string;
    org: string;
}

export default function Home() {
    const { register, handleSubmit } = useForm<IForm>();

    async function betaform(data: IForm) {
        Swal.showLoading();
        await uploadData(data);
        Swal.fire({
            icon: "success",
            text: "Submitted Successfully",
        });
    }

    return (
        <Container maxWidth="md">
            <img src="/logos/full.png" style={{ width: "100%" }} />
            <form onSubmit={handleSubmit(betaform)}>
                <Box mt="1rem" display="flex" flexDirection="column" rowGap="1rem" mb="2rem">
                    <Box>
                        <Typography fontSize="1.3rem">First Name</Typography>
                        <TextField {...register("firstname")} variant="outlined" size="small" required fullWidth />
                    </Box>
                    <Box>
                        <Typography fontSize="1.3rem">Last Name</Typography>
                        <TextField {...register("lastname")} variant="outlined" size="small" required fullWidth />
                    </Box>
                    <Box>
                        <Typography fontSize="1.3rem">Email</Typography>
                        <TextField {...register("email")} variant="outlined" size="small" required fullWidth type="email" />
                    </Box>
                    <Box>
                        <Typography fontSize="1.3rem">Phone Number</Typography>
                        <TextField {...register("phoneNumber")} variant="outlined" size="small" required fullWidth />
                    </Box>
                    <Box>
                        <Typography fontSize="1.3rem">Organization Type</Typography>
                        <Select {...register("type")} variant="outlined" size="small" required fullWidth>
                            <MenuItem value="startup">Startup</MenuItem>
                            <MenuItem value="enabler">Enabler</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <Typography fontSize="1.3rem">Organization Name</Typography>
                        <TextField {...register("org")} variant="outlined" size="small" required fullWidth />
                    </Box>
                    <Box>
                        <MainBtn size="large" type="submit">
                            Submit
                        </MainBtn>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}
