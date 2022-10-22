import { Send } from "@mui/icons-material"
import { Avatar, Badge, Box, Button, Grid, styled, TextareaAutosize, TextField, Typography } from "@mui/material"
import { width } from "@mui/system"
import { ref, set } from "firebase/database"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { postComment } from "../redux/news"
import { dbFirebase } from "../services/firebase/base"

const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }))

const Comments = (props) => {
    const { url } = props

    const [comment, setComment] = useState('')
    
    const dispacth = useDispatch()
    
    const handleChange = event => {
        setComment(event.target.value)
    }

    const handlePostComment = (e) => {
        e.preventDefault();
        console.log(comment)
        dispacth(postComment({
            url,
            body : comment
        }
        )).then(res => console.log(res))
        .catch(err => console.log('err', err))
      }

    return (
        <>
        <form noValidate autoComplete='off' onSubmit={(e) => {handlePostComment(e)}}>
            <Grid container spacing={1}>
                <Grid item md={8} xs={12}>
                    <Box className='' sx={{ mb: 1, width:'100%' }}>
                        <TextField
                            sx={{width:'100%'}}
                            multiline
                            maxRows={4}
                            value={comment}
                            variant='standard'
                            label='Input your comment'
                            id='comments-news'
                            onChange={handleChange}
                        />
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                <Button type="submit" variant='contained' endIcon={<Send />}>
                    Send
                </Button>
                </Grid>
            </Grid>
        </form>
        
        {/* coment list */}
        <Box sx={{ pt: 2, pb: 3, px: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
           <Badge sx={{alignItems:'start', pt:0.5}}>

            <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '3rem', height: '3rem' }} />
           </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{`userComment.name`}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {`userComment.createdAt`}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '1rem', color: 'black', mt:1 }}>
                {`userComment.body`}
              </Typography>
            </Box>
          </Box>
        </Box>
       
        </>
    )
}

export default Comments