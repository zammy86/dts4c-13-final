import { map } from "@firebase/util"
import { Send } from "@mui/icons-material"
import { Avatar, Badge, Box, Button, Grid, styled, TextareaAutosize, TextField, Typography } from "@mui/material"
import { width } from "@mui/system"
import { child, equalTo, get, getDatabase, limitToLast, onValue, push, query, ref, set } from "firebase/database"
import md5 from "md5"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getComments, postComment } from "../redux/news"
import { authFirebase, dbFirebase } from "../services/firebase/base"


const Comments = (props) => {
    const { url } = props
    
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const [commentsStore, setCommentStore] = useState([]) 
    
    const handleChange = event => {
        setComment(event.target.value)
    }

    const handlePostComment = (e) => {
        e.preventDefault();
        dispatch(postComment(
            {
                url,
                body : comment
            }
        )).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                setComment('')
            }
        })
    }

    //hook list data from 'firebase realtime database'
       
    useEffect(() => {
        const id_url = md5(url)

        const recentPostsRef  =  query(ref(dbFirebase, `comments/${id_url}`))
        onValue(recentPostsRef, (snapshot) => {
            let data = null
            if (snapshot.exists()) {
                data = snapshot.val()
                var hasil = Object.keys(data).map((key) => [Number(key), data[key]][1]);
                setCommentStore(hasil)
            } else {
              console.log("No data available");
            }
          })
    },[])
   
    
    return (
        <>
        <form noValidate={false} autoComplete='off' onSubmit={(e) => {handlePostComment(e)}}>
            <Grid container spacing={1}>
                <Grid item md={8} xs={12}>
                    <Box className='' sx={{ mb: 1, width:'100%' }}>
                        <TextField
                            required
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
        
        {/* render coment list */}
        { (commentsStore.length) ? 
            commentsStore.map((userComment, idx) => {
            return (
                <Box key={idx} sx={{ pt: 2, pb: 3, px: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Badge sx={{alignItems:'start'}}>
                            <Avatar alt={userComment.name} src='/images/avatars/1.png' sx={{ width: '3rem', height: '3rem' }} />
                        </Badge>
                        <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600 }}>{userComment.name}</Typography>
                            <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                {userComment.created_at}
                            </Typography>
                            <Typography variant='body2' sx={{ fontSize: '1rem', color: 'black', mt:1 }}>
                                {userComment.body}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )
        }) : null }
       
       
        </>
    )
}

export default Comments