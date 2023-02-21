import React, {useState} from 'react';
import {Box, Container, Grid, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {activitiesList} from "@/lib/util/activitiesList";
import ConfirmModal from "@/components/elements/organisms/ConfirmModal";

const CreateGathering = () => {

    const [endDate, setEndDate] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const AddEndDate = (
        <Box width="100%"
             sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
             onClick={() => {
                 setEndDate(!endDate)
             }}
        >
            <Typography variant="subtitle1" fontWeight="bold" sx={{color: "green", cursor: "pointer"}}>+ End
                Date</Typography>
        </Box>
    )

    return (
        <Box component="main" sx={{backgroundColor: "#E0EFDC", mt: 5, display: "flex", justifyContent: "center"}}>
            <Box width="80%">
                <Typography variant="h1" textAlign="center" py={2}> Create Gathering </Typography>
                <Paper sx={{maxWidth: "lg", py: 4, mb:6}}>
                    <Container>
                        <Box width="100%" sx={{height: "10rem", backgroundColor: "#EFF2F5", position: "relative"}}>
                            <TriggerButton title="+ Add cover" color="green" onClick={() => {
                            }} style={{
                                position: "absolute",
                                right: 10,
                                bottom: 10,
                                width: {xs: "130px", md: "180px"},
                                borderRadius: 0
                            }}/>
                        </Box>
                        <Grid container columnSpacing={1} my={2}>
                            <Grid item sx={{backgroundColor: "#C9CCD1", borderRadius: "50%", ml: 2}} xs={.8}>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Misato Tanno</Typography>
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Host</Typography>
                            </Grid>
                        </Grid>
                        <Stack direction='column' my={2} spacing={3}>
                            <TextField
                                id="name"
                                label="Event name"
                                variant="outlined"
                                fullWidth={true}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="name"
                                    label="Date"
                                    variant="outlined"
                                    fullWidth={true}
                                />
                                {endDate ? <TextField
                                    id="name"
                                    label="End Date"
                                    variant="outlined"
                                    fullWidth={true}
                                /> : AddEndDate}
                            </Stack>
                            <TextField
                                id="name"
                                label="Location"
                                variant="outlined"
                                fullWidth={true}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue="Description"
                            />
                            <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                                <TextField
                                    id="name"
                                    label="Meeting Point"
                                    variant="outlined"
                                    fullWidth={true}
                                />
                                <TextField
                                    id="name"
                                    label="Meeting Time"
                                    variant="outlined"
                                    fullWidth={true}
                                />
                            </Stack>
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Genre"
                                    defaultValue="EUR"
                                    helperText="Please select activity genre"
                                    fullWidth={true}
                                >
                                    {activitiesList.map((option) => (
                                        <MenuItem key={option.id} value={option.title}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Spots"
                                    defaultValue="EUR"
                                    helperText="Please select activity genre"
                                    fullWidth={true}
                                >
                                    {activitiesList.map((option) => (
                                        <MenuItem key={option.id} value={option.title}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Duration"
                                    defaultValue="EUR"
                                    helperText="Please select your currency"
                                    fullWidth={true}
                                >
                                    {activitiesList.map((option) => (
                                        <MenuItem key={option.id} value={option.title}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <TriggerButton title="Confirm" color={"green"} onClick={() => {setOpenModal(true)
                            }}/>
                        </Stack>
                    </Container>
                </Paper>
            </Box>
            { openModal ? <ConfirmModal openModal={openModal} setOpenModal={setOpenModal}/> : null }
        </Box>
    );
};

export default CreateGathering;