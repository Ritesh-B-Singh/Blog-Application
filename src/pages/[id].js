import { Box, Card, CardContent, Typography, CardMedia, Button, Modal } from "@mui/material";
import { getCookie } from "cookies-next";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as React from 'react';
import BlogForm from "@/components/BlogForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    maxHeight: 600,
};


export default function IndividualBlog({ cookie, blog }) {
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let router = useRouter()
    const handleDeleteBlog = () => {
        setIsLoading(true)
        try {
            const res = axios.delete(`http://localhost:3000/api/blog/${blog._id}`)
            router.push('/')
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const onSuccess = () => router.push('/myblogs')

    return (
        <>
            <Navbar cookie={cookie} />
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Card sx={{ maxWidth: '100%', width: '100%' }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="340"
                        image={blog.image}
                    />
                    <CardContent sx={{ pl: 20, pr: 20 }}>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                            <Typography gutterBottom variant="h4" component="div">
                                {blog.title}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            {(cookie === blog.author) &&
                                <Box display={'flex'} flexDirection={'row'} gap={2}>
                                    <Button
                                        size={'small'}
                                        variant="outlined"
                                        onClick={handleOpen}
                                        sx={{ my: 2, display: 'block', fontWeight: 'bold' }}
                                    >
                                        Edit
                                    </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <BlogForm title={blog.title} image={blog.image} author={blog.author} description={blog.description} date={blog.date} id={blog._id} onSuccess={onSuccess} />
                                        </Box>
                                    </Modal>
                                    <Button
                                        size={'small'}
                                        variant="outlined"
                                        onClick={handleDeleteBlog}
                                        disabled={isLoading}
                                        sx={{ my: 2, display: 'block', fontWeight: 'bold' }}
                                    >
                                        Delete
                                    </Button>
                                </Box>}
                        </Box>
                        <Box>
                            <Typography paragraph variant="body1" color="text.secondary" dangerouslySetInnerHTML={{
                                __html:
                                    `${blog.description}`
                            }} >
                            </Typography>
                            <Typography mt={2} variant="body2" color="text.secondary">{blog.date}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box >
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    let cookie = getCookie('email', { req, res });
    if (!cookie) cookie = ""
    const response = await axios.get(`http://localhost:3000/api/blog/${query.id}`);
    const blog = response.data.blog;
    return { props: { cookie, blog } }
}
