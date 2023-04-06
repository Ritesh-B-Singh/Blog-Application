import { Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { getCookie } from "cookies-next";
import Navbar from "@/components/Navbar";

export default function Home({ blogs, cookie }) {
  console.log(blogs) 
  return (
    <>
      <Navbar cookie={cookie} />
      <Box sx={{ display: 'flex', pt: 2, alignItems: 'center', flexDirection: 'column' }}>
        {blogs.map((blog, index) =>
          <Box key={index} sx={{ m: 2, mt: 3, maxWidth: 550 }}>
            {BlogCard({ title: blog.title, description: blog.description, imageUrl: blog.image, date: blog.date, id: blog._id })}
          </Box>
        )}
      </Box>
    </>
  )
}

export async function getServerSideProps({req, res}) {
  let cookie = getCookie('email', { req, res });
  if(!cookie) cookie = ""
  const response = await axios.get('http://localhost:3000/api/blogs');
  const blogs = response.data.blogs;
  return { props: { blogs, cookie } } 
}
