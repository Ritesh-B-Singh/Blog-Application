import { Grid, Card, CardHeader, Box, CardContent, TextField, CardActions, Button } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"
import Navbar from "@/components/Navbar"
import { getCookie } from "cookies-next"

export default function Login({cookie}) {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    let router = useRouter()
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const req = { ...userData }
            const response = await axios.post('http://localhost:3000/api/signin', req);
            router.push("/")
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    return (
        <>
        <Navbar cookie={cookie} />
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <Grid sx={{ maxWidth: 600, height: 600, mt: 2 }} container spacing={2}>
                <Grid item md={12} sm={12} xs={12} >
                    <Card sx={{ maxHeight: '100%' }} elevation={3}>
                        <CardHeader title="Login Form"></CardHeader>
                        <CardContent>
                            <Grid item container spacing={1} justify="center">
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        name="email"
                                        onChange={handleChange}
                                        label="Email"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        label="Password"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Box display={'flex'} justifyContent={'center'} width={'100%'} >
                                <Button onClick={handleSubmit} disabled={isLoading} sx={{ textTransform: 'none' }} variant="contained">Login</Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export const getServerSideProps = ({ req, res }) => {
    let cookie = getCookie('email', { req, res });
    if (!cookie) cookie = ""
    return { props: { cookie } };
};
