import { Grid, Card, CardHeader, Box, CardContent, TextField, CardActions, Button } from "@mui/material"
import "../styles/blogForm.module.css"
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import { useState } from "react";
import axios from "axios";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export default function BlogForm({ id, image, title, description, author, date, onSuccess }) {
    const [isLoading, setIsLoading] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [newImage, setNewImage] = useState(image)
    const [newdescription, setNewDescription] = useState(description)

    const handleOnChange = (editorContent) => setNewDescription(editorContent)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const req = { title: newTitle, image: newImage, description: newdescription, author, date }
            const response = await axios.put(`http://localhost:3000/api/blog/${id}`, req);
            onSuccess()
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <Grid sx={{ maxWidth: 900, maxHeight: 900, height: 900, mt: 2 }} container spacing={2}>
                    <Grid item md={12} sm={12} xs={12} >
                        <Card sx={{ maxHeight: '100%' }} elevation={3}>
                            <CardHeader title="Create Blog Form"></CardHeader>
                            <CardContent>
                                <Grid item container spacing={1} justify="center">
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            defaultValue={title}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            label="Title"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            defaultValue={image}
                                            onChange={(e) => setNewImage(e.target.value)}
                                            label="Image Url"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <SunEditor defaultValue={description} onChange={handleOnChange} height={200} placeholder="Start writing your blog..." />
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
