import {gql} from "apollo-server-micro"

const typeDefs = gql`
    scalar Date
    type Location {
        Latitude: Float!
        Longitude: Float!
    }
    enum ActivityGenre {
        Hiking,
        Biking,
        Climbing,
        SnowActivities,
        RoadTrip,
        Fishing,
        Picnicking,
        ExploringTown
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        passwordConfirm: String!
    }
    
    type Activity {
        id: ID!
        name: String!
        date: Date!
        duration: Int!
        spots: Int!
        description: String!
        imageCover: String!
        images: [String]
        createdAt: Date!
        meetupLocation: Location!
        location: Location!
        genre: ActivityGenre!
        available: Boolean!
    }
    
    type Query {
        getAllUsers: [User]
        getUser(id: ID!): User!
        Activity(id: ID!): Activity!
        ActivitiesByGenre(genre: String): [Activity]
    }
#    User Mutation
    input CreateUserInput {
        name: String!
        email: String!
        password: String!
        passwordConfirm: String!
    }
    
    input CreateActivity {
        name: String!
        date: Date!
        duration: Int!
        spots: Int!
        description: String!
        imageCover: String!
        images: [String]
        createdAt: Date!
#        meetupLocation: Location!
#        location: Location!
        genre: ActivityGenre!
        available: Boolean!
    }
    
    type Mutation {
        createUser(input: CreateUserInput): User!
#        createActivity(input: CreateActivity): Activity!
    }
`

export default typeDefs