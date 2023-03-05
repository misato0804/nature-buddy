import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {activitiesList} from "@/lib/util/activitiesList";
import ConfirmModal from "@/components/elements/organisms/ConfirmModal";
import {useActivityContext} from "@/lib/context/activityInputContext";
import LocationInput from "@/components/elements/molecules/LocationInput";
import useValidator from "@/lib/hooks/useValidator";
import initialActivityError from "@/lib/helpers/initialActivityError";
import {dateValidation, getDate, modifier} from "@/lib/helpers/dateModifyer";
import {getSession, signIn} from "next-auth/react";

const CreateGathering = () => {

    /**
     * TODO: GET USER DATA
     */

    const [name, setName] = useState<string | null | undefined>("")

    useEffect(() => {
        const securePage = async () => {
            const session = await getSession()
            console.log(session)
            if (!session) {
                signIn()
            } else {
                // setLoading(false)
                setName(session.user?.name)
                console.log(session.user?.name)
            }
        }
        securePage()
    }, [])

    const today = new Date()
    const {...context} = useActivityContext()
    const {stringValidator, allValidator} = useValidator()
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [uploadDate, setUploadDate] = useState<string | undefined>()
    const [fileData, setFileData] = useState<FileList | undefined>()
    const [errorObj, setErrorObj] = useState(initialActivityError)
    const [date, setDate] = useState<string>(getDate(today))
    const [endDate, setEndDate] = useState<string>(getDate(today))

    const AddEndDate = (
        <Box width="100%"
             sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
             onClick={() => {
                 setEndDateOpen(!endDateOpen)
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
        uploadDate ? setErrorObj({...errorObj, image: {error: false, message: ""}}) : setErrorObj({
            ...errorObj,
            image: {error: true}
        })
        console.log(errorObj.image)
    }

    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setTitle(e.target.value)
        const titleError = stringValidator(e.target.value, "title is between 2-50 letters", 2, 50)
        setErrorObj({...errorObj, title: titleError})
    }

    const dateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
        const dateCtx = modifier(e.target.value)
        context.setDate(dateCtx)
        endDateOpen && dateValidation(date, endDate) > 0 ? setErrorObj({
            ...errorObj,
            endDate: {error: false, message: ""},
            date: {error: false, message: ""}
        }) : setErrorObj({
            ...errorObj,
            endDate: {error: true, message: "End date must be after Date"},
            date: {error: true, message: "End date must be after Date"}
        })

    }

    const endDateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value)
        const endDateCtx = modifier(e.target.value)
        context.setEndDate(endDateCtx)
        dateValidation(date, endDate) > 0 ? setErrorObj({
            ...errorObj,
            endDate: {error: false, message: ""},
            date: {error: false, message: ""}
        }) : setErrorObj({
            ...errorObj,
            endDate: {error: true, message: "End date must be after Date"},
            date: {error: true, message: "End date must be after Date"}
        })
    }

    const descriptionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setDescription(e.target.value)
        const descriptionError = stringValidator(e.target.value, "description must be between 20 and 1000", 20, 1000)
        setErrorObj({...errorObj, description: descriptionError})
    }

    const spotsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setSpots(Number(e.target.value))
        context.spots < 1 ? setErrorObj({
            ...errorObj,
            spots: {error: true, message: "Please add your group size"}
        }) : setErrorObj({...errorObj, spots: {error: false, message: ""}})
    }

    const durationOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        context.setDuration(e.target.value)
        const durationError = stringValidator(e.target.value, "Please input duration", 3)
        setErrorObj({...errorObj, duration: durationError})
    }

    const onClickHandler = () => {
        const errorArr = Object.values(errorObj)
        const newArr = errorArr.filter(item => item.error)
        allValidator() && uploadDate ? setOpenModal(true) : setOpenModal(false)

    }

    return (
        <Box component="main" sx={{backgroundColor: "#E0EFDC", mt: 5, display: "flex", justifyContent: "center"}}>
            <Box width="80%">
                <Typography variant="h1" textAlign="center" py={2}> Create Gathering </Typography>
                <Paper sx={{maxWidth: "lg", py: 4, mb: 6}}>
                    <Container>

                        <Box width="100%" sx={{height: "10rem", backgroundColor: "#EFF2F5", position: "relative"}}>
                            {uploadDate ? <img src={uploadDate}
                                               style={{
                                                   objectFit: "cover",
                                                   width: "100%",
                                                   "height": "100%"
                                               }}/> : null}
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
                                <Typography variant="subtitle1" sx={{color: "grey"}}>{name}</Typography>
                                <Typography variant="subtitle1" sx={{color: "grey"}}>Host</Typography>
                            </Grid>
                        </Grid>
                        <Stack direction='column' my={2} spacing={3}>
                            <TextField
                                id="title"
                                label="Event title"
                                variant="outlined"
                                error={errorObj.title.error}
                                fullWidth={true}
                                value={context.title}
                                onChange={titleOnChange}
                                helperText={errorObj.title.error ? errorObj.title.message : ""}
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="date"
                                    label="Date"
                                    type="date"
                                    error={errorObj.date.error}
                                    value={date}
                                    helperText={errorObj.date.error ? errorObj.date.message : ""}
                                    onChange={dateOnChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth={true}
                                />
                                {
                                    endDateOpen ?
                                        <TextField
                                            id="endDate"
                                            label="End date"
                                            error={errorObj.endDate.error}
                                            type="date"
                                            value={endDate}
                                            helperText={errorObj.endDate.error ? errorObj.endDate.message : ""}
                                            onChange={endDateOnChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth={true}
                                        />
                                        : AddEndDate
                                }
                            </Stack>
                            <LocationInput
                                placeholder="Destination"
                                setLocation={context.setLocation}
                                errorObj={errorObj.location}
                                location={context.location}
                                setDestination={context.setDestination}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                error={errorObj.description.error}
                                multiline
                                rows={4}
                                defaultValue="Description"
                                helperText={errorObj.description.error ? errorObj.description.message : ""}
                                onChange={descriptionOnChange}
                            />
                            <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                                <LocationInput
                                    placeholder="Meeting point"
                                    setLocation={context.setMeetingPoint}
                                    location={context.meetingPoint}
                                    errorObj={errorObj.meetingPoint}
                                />
                                <TextField
                                    id="time"
                                    label="Meeting time"
                                    type="time"
                                    error={errorObj.meetingTime.error}
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
                                    error={errorObj.spots.error}
                                    value={context.spots}
                                    onChange={spotsOnChange}
                                    helperText="Please input how many buddies you need"
                                    fullWidth={true}
                                >
                                </TextField>
                                <TextField
                                    id="duration"
                                    label="Duration"
                                    variant="outlined"
                                    fullWidth={true}
                                    error={errorObj.duration.error}
                                    value={context.duration}
                                    onChange={durationOnChange}
                                    helperText="e.g. 1h30, 2days etc.."

                                />
                            </Stack>
                            <TriggerButton title="Confirm" color={allValidator() && uploadDate ? "green" : "grey"}
                                           onClick={onClickHandler}/>
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