type Error = {
    error: boolean,
    message?: string | undefined
}

type ErrorObj = {
    title: Error,
    date: Error,
    endDate: Error,
    location: Error,
    destination: Error,
    description: Error,
    meetingPoint: Error,
    meetingTime: Error,
    genre: Error,
    spots: Error,
    image: Error,
    duration: Error
}

let initialActivityError : ErrorObj = {
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
        message: ""
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
    },
    image: {
        error: true,
        message:""
    }
}

export default initialActivityError