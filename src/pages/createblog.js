import { Grid, Card, CardHeader, Box, CardContent, TextField, CardActions, Button } from "@mui/material"
import "../styles/blogForm.module.css"
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { getCookie } from "cookies-next";
import Navbar from "@/components/Navbar";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export default function CreateBlog({ cookie }) {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("");
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let router = useRouter()

    const handleOnChange = (editorContent) => setDescription(editorContent)

    const handleSubmit = async () => {
        setIsLoading(true)
        try{
            const author = "ritesh";
            let date = new Date().toDateString();
            const req = {title, image, description, author, date}
            const response = await axios.post('http://localhost:3000/api/blogs', req);
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
                        <CardHeader title="Create Blog Form"></CardHeader>
                        <CardContent>
                            <Grid item container spacing={1} justify="center">
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                        label="Title"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        onChange={(e) => setImage(e.target.value)}
                                        label="Image Url"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <SunEditor onChange={handleOnChange} height="100%" placeholder="Start writing your blog..." />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Box display={'flex'} justifyContent={'center'} width={'100%'} >
                                <Button sx={{ textTransform: 'none' }} onClick={handleSubmit} disabled={isLoading} variant="contained">Post</Button>
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