import React, {useState} from 'react';
import {Box, Button, Container, Grid, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {activitiesList} from "@/lib/util/activitiesList";
import ConfirmModal from "@/components/elements/organisms/ConfirmModal";
import {useActivityContext} from "@/lib/context/activityInputContext";
import useWindowSize from "@/lib/hooks/useWindowSize";
import LocationInput from "@/components/elements/molecules/LocationInput";


const CreateGathering = () => {

    /**
     * TODO: GET USER DATA
     * TODO: CONNECT TO CLOUDINARY
     */

    const {...context} = useActivityContext()
    const [width, height] = useWindowSize();
    const [endDate, setEndDate] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [uploadDate, setUploadDate] = useState()

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

    function handleOnChange () {
        const reader = new FileReader();
    }


    return (
        <Box component="main" sx={{backgroundColor: "#E0EFDC", mt: 5, display: "flex", justifyContent: "center"}}>
            <Box width="80%">
                <Typography variant="h1" textAlign="center" py={2}> Create Gathering </Typography>
                <Paper sx={{maxWidth: "lg", py: 4, mb: 6}}>
                    <Container>
                        <Box width="100%" sx={{height: "10rem", backgroundColor: "#EFF2F5", position: "relative"}}>

                            <label htmlFor="upload-photo">
                                <input
                                    style={{display: "none"}}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                />
                                <TriggerButton
                                    title="+ Add cover"
                                    color="green"
                                    onClick={() => {}}
                                    style={{
                                        position: "absolute",
                                        right: 10,
                                        bottom: 10,
                                        width: {xs: "130px", md: "180px"},
                                        borderRadius: 0
                                    }}/>
                            </label>
                        </Box>
                        <Grid container columnSpacing={1} my={2}>
                            <Grid item sx={{backgroundColor: "#C9CCD1", borderRadius: "50%", ml: 2}} xs={.8}>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Misato Tanno</Typography>
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Host {context.title}</Typography>
                            </Grid>
                        </Grid>
                        <Stack direction='column' my={2} spacing={3}>
                            <TextField
                                id="title"
                                label="Event title"
                                variant="outlined"
                                fullWidth={true}
                                value={context.title}
                                onChange={(e) => context.setTitle(e.target.value)}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    value={context.date}
                                    onChange={(e) => context.setDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth={true}
                                />
                                {
                                    endDate ?
                                        <TextField
                                            id="endDate"
                                            label="End date"
                                            type="date"
                                            value={context.endDate}
                                            onChange={(e) => context.setEndDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth={true}
                                        />
                                        : AddEndDate
                                }
                            </Stack>
                            <LocationInput placeholder="Destination" setLocation={context.setLocation}
                                           location={context.location} setDestination={context.setDestination}/>
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue="Description"
                                onChange={(e) => context.setDescription(e.target.value)}
                            />
                            <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                                <LocationInput placeholder="Meeting point" setLocation={context.setMeetingPoint}
                                               location={context.meetingPoint}/>
                                <TextField
                                    id="time"
                                    label="Meeting time"
                                    type="time"
                                    value={context.meetingTime}
                                    onChange={(e) => context.setMeetingTime(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    fullWidth={true}
                                />
                            </Stack>
                            <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Genre"
                                    defaultValue={activitiesList[0].title}
                                    helperText="Please select activity genre"
                                    fullWidth={true}
                                >
                                    {activitiesList.length > 0 && activitiesList.map((option) => (
                                        <MenuItem key={option.id} value={option.title}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency"
                                    type="number"
                                    label="Spots"
                                    value={context.spots}
                                    onChange={(e) => context.setSpots(Number(e.target.value))}
                                    helperText="Please input how many buddies you need"
                                    fullWidth={true}
                                >
                                </TextField>
                                <TextField
                                    id="duration"
                                    label="Duration"
                                    variant="outlined"
                                    fullWidth={true}
                                    value={context.duration}
                                    onChange={(e) => context.setDuration(e.target.value)}
                                    helperText="e.g. 1h30, 2days etc.."

                                />
                            </Stack>
                            <TriggerButton title="Confirm" color={"green"} onClick={() => {
                                setOpenModal(true)
                            }}/>
                        </Stack>
                    </Container>
                </Paper>
            </Box>
            {openModal ? <ConfirmModal openModal={openModal} setOpenModal={setOpenModal}/> : null}
        </Box>
    );
};

export default CreateGathering;