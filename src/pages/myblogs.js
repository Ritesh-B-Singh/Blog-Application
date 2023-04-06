import { Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { getCookie } from "cookies-next";
import Navbar from "@/components/Navbar";

export default function MyBlogs({ blogs, cookie }) {
    console.log(blogs)
    return (
        <>
            <Navbar cookie={cookie} />
            {!cookie ? <Typography>Login to view personal blogs</Typography> : (blogs.length === 0) ? <Typography>No blog available</Typography> :
                <Box sx={{ display: 'flex', pt: 2, alignItems: 'center', flexDirection: 'column' }}>
                    {blogs.map((blog, index) =>
                        <Box key={index} sx={{ m: 2, mt: 3, maxWidth: 550 }}>
                            {BlogCard({ title: blog.title, description: blog.description, imageUrl: blog.image, date: blog.date, id: blog._id })}
                        </Box>
                    )}
                </Box>}
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    let cookie = getCookie('email', { req, res });
    if (!cookie) cookie = ""
    const request = { email: cookie }
    const response = await axios.post('http://localhost:3000/api/individual_blogs', request);
    const blogs = response.data.blogs;
    return { props: { blogs, cookie } }
}
