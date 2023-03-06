import {useRouter} from "next/router";
import {Box, Container, Stack, Typography} from "@mui/material";
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import BuddyIcon from "@/components/elements/atoms/BuddyIcon";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";
import BrowseByActivity from "@/components/elements/organisms/BrowseByActivity";


const User = ({user}: any) => {

    //user page
    const router = useRouter()
    const border = <hr style={{marginTop:".5rem", marginBottom:"1rem", border:"none", height:"2px", backgroundColor: "#A2A2A2"}}/>


    return (
        <Container sx={{mt: {xs: 12, sm: 6}}}>
            <Box>
                <Typography variant="h1">Welcome, {user.name}</Typography>
                <Box className="next-event" sx={{mt: 3}}>
                    <Typography variant="h2">Your next event</Typography>
                    {border}
                    <Box sx={{width: "100%"}}>
                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>
                    </Box>
                </Box>
                <Box className="my-buddies" sx={{mt: 3, position: "relative"}}>
                    <Typography variant="h2">Your buddies</Typography>
                    {border}
                    <Stack direction="row" spacing={3} sx={{py: 1.2}}>
                        <BuddyIcon src=""/>
                        <BuddyIcon src=""/>
                        <BuddyIcon src=""/>
                    </Stack>
                    <Box
                        sx={{position: "absolute", bottom: 0, right: 0, cursor: "pointer"}}
                        onClick={() => {
                            router.push(`/user/${user._id}/buddies`)
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight={600}>see your buddies</Typography>
                    </Box>
                </Box>
                <Box className="my-buddies" sx={{mt: 3}}>
                    <Typography variant="h2" my={2}>Upcoming activities</Typography>
                    {border}
                    {/*<NoEventBlock/>*/}
                    <Stack spacing={3}>
                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>

                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>

                    </Stack>
                </Box>
                <Box className="my-buddies" sx={{mt: 3}}>
                    <Typography variant="h2" my={2}>Activities you are likely interested in</Typography>
                    {border}
                    {/*<NoEventBlock/>*/}
                    <Stack spacing={3}>
                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>

                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>
                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>

                        <ActivityBlock title="Activity" number={3} host="Misato" date="2022/1/23" genre="hiking"
                                       url="123"
                                       image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMountain_Warehouse&psig=AOvVaw35jbuWvXkZYsP9ekSlrYg4&ust=1678162919218000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNCnmZe6xv0CFQAAAAAdAAAAABAE"/>

                    </Stack>
                </Box>
                <BrowseByActivity/>
            </Box>
        </Container>
    );
};

export default User;

export async function getServerSideProps() {

    const res = await fetch('http://localhost:3000/api/user/640046988dbaa4a6bfae6a15')
    const user = await res.json()

    console.log(user)
    return {
        props: {
            user: user.data
        }
    }
}
