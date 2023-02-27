type Error = {
    error: boolean,
    message: string
}

const initialActivityError = {
    title: {
        error: false,
        message: ""
    },
    date: {
        error: false,
        message: ""
    },
    endDate: {
        error: false,
        message: ""
    },
    location: {
        error: false,
        message: ""
    },
    destination: {
        error: false,
        message: ""
    },
    description: {
        error: false,
        message: ""
    },
    meetingTime:  {
        error: false,
        message: ""
    },
    meetingPoint: {
        error: false,
        messge: ""
    },
    genre: {
        error: false,
        message: ""
    },
    spots: {
        error: false,
        message: ""
    },
    duration: {
        error: false,
        message: ""
    }
}

export default initialActivityError