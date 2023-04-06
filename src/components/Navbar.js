import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next';

const pages = [{ name: 'Home', url: '/' }, { name: 'My Blogs', url: `/myblogs` }, { name: 'Create Blog', url: '/createblog' }];

function Navbar({ cookie, req, res }) {
    let router = useRouter()

    const handleLogout = () => {
        deleteCookie('email')
        router.push('/')
    }

    return (
        <AppBar sx={{ background: '#000' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CollectionsIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Typography
                        variant="h6"
                        mr={3}
                        noWrap
                        onClick={() => router.push("/")}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            background: "#000",
                            p: 0
                        }}
                    >
                        Blog Gallery
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => router.push(page.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {cookie.length ?
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} >
                            <Typography>{cookie}</Typography>
                            <Button
                                onClick={handleLogout}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                            >
                                Logout
                            </Button>
                        </Box>
                        :
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button
                                onClick={() => router.push("/login")}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => router.push("/register")}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Signup
                            </Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;