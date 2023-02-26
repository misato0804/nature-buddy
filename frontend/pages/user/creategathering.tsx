import React, {useState} from 'react';
import {Box, Container, Grid, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {activitiesList} from "@/lib/util/activitiesList";
import ConfirmModal from "@/components/elements/organisms/ConfirmModal";
import {useActivityContext} from "@/lib/context/activityInputContext";
import LocationInput from "@/components/elements/molecules/LocationInput";
import {
    dateValidator,
    descriptionValidator,
    locationValidator,
    meetingTimeValidation, spotsValidation,
    titleValidator
} from "@/lib/helpers/inputValidators";

const CreateGathering = () => {

    /**
     * TODO: GET USER DATA
     */

    const {...context} = useActivityContext()
    const [endDate, setEndDate] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [uploadDate, setUploadDate] = useState<string | undefined>()
    const [fileData, setFileData] = useState<FileList | undefined>()
    const [errorObj, setErrorObj] = useState<any>({
        title: false,
        date: false,
        location: false,
        destination: false,
        description: false,
        meetingTime: false,
        meetingPoint: false,
        genre: false,
        spots: false,
        duration: false
    })

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

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = function (loadEvent) {
            loadEvent.target && setUploadDate(loadEvent.target.result as string)
        }
        e.target.files && setFileData(e.target.files)
        e.target.files && reader.readAsDataURL(e.target.files[0])
    }

    const ableToGoToConfirm = () => {
        titleValidator(context.title) ? setErrorObj({...errorObj, title: true}) : null
        !dateValidator(context.date) ? errorObj.date = true : null
        !locationValidator(context.location) ? errorObj.location = true : null
        descriptionValidator(context.description) ? setErrorObj({...errorObj, description: true}) : null
        !meetingTimeValidation(context.meetingTime) ? setErrorObj({...errorObj, meetingTime: true}) : null
        !spotsValidation(context.spots) ? setErrorObj({...errorObj, spots: true}) : null
        descriptionValidator(context.description) ? setErrorObj({...errorObj, duration: true}) : null

        const allClear = Object.values(errorObj)

        if (allClear.includes(true)) {
            setOpenModal(false)
            return;
        }

        setOpenModal(true)
    }

    return (
        <Box component="main" sx={{backgroundColor: "#E0EFDC", mt: 5, display: "flex", justifyContent: "center"}}>
            <Box width="80%">
                <Typography variant="h1" textAlign="center" py={2}> Create Gathering </Typography>
                <Paper sx={{maxWidth: "lg", py: 4, mb: 6}}>
                    <Container>
                        <Box width="100%" sx={{height: "10rem", backgroundColor: "#EFF2F5", position: "relative"}}>
                            {uploadDate ? <img src={uploadDate}
                                               style={{objectFit: "cover", width: "100%", "height": "100%"}}/> : null}
                            <label htmlFor="file">
                                <input
                                    style={{display: "none"}}
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={handleOnchange}
                                />
                                <TriggerButton
                                    title="+ Add cover"
                                    color="green"
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
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Host</Typography>
                            </Grid>
                        </Grid>
                        <Stack direction='column' my={2} spacing={3}>
                            <TextField
                                id="title"
                                label="Event title"
                                variant="outlined"
                                error={errorObj.title}
                                fullWidth={true}
                                value={context.title}
                                onChange={(e) => context.setTitle(e.target.value)}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    error={errorObj.date}
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
                                error={errorObj.description}
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
                                    error={errorObj.meetingTime}
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
                                    error={errorObj.spots}
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
                                    error={errorObj.duration}
                                    fullWidth={true}
                                    value={context.duration}
                                    onChange={(e) => context.setDuration(e.target.value)}
                                    helperText="e.g. 1h30, 2days etc.."

                                />
                            </Stack>
                            <TriggerButton title="Confirm" color={openModal ? "green" : "grey"} onClick={
                                ableToGoToConfirm}/>
                        </Stack>
                    </Container>
                </Paper>
            </Box>
            {openModal ? <ConfirmModal openModal={openModal} setOpenModal={setOpenModal} uploadDate={uploadDate}
                                       fileData={fileData}/> : null}
        </Box>
    );
};

export default CreateGathering;