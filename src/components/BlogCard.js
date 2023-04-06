import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useRouter } from "next/router";

export default function BlogCard({ title, description, imageUrl, date, id }) {
    let router = useRouter()

    const handleIndividualBlog = () => router.push(`/${id}`)

    return (
        <Card sx={{ maxWidth: 545, width: 545, maxHeight: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={imageUrl}
            />
            <CardContent sx={{ pb: 0, pt: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Box>
                    <Typography paragraph variant="body2" sx={{
                        overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '3', whiteSpace: 'pre-wrap', mb: 0
                    }} color="text.secondary" dangerouslySetInnerHTML={{
                        __html:
                            `${description}`
                    }} >
                    </Typography>
                    <Typography mt={2} variant="caption" color="text.secondary">{date}</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
                <Button onClick={handleIndividualBlog} size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
