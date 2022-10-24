import { map } from "@firebase/util"
import { Close, Send } from "@mui/icons-material"
import { Avatar, Badge, Box, Button, Dialog, DialogContent, Grid, IconButton, Modal, styled, TextareaAutosize, TextField, Typography } from "@mui/material"
import { width } from "@mui/system"
import { child, equalTo, get, getDatabase, limitToLast, onValue, push, query, ref, set } from "firebase/database"
import md5 from "md5"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux"
import { getComments, postComment } from "../redux/news"
import { authFirebase, dbFirebase } from "../services/firebase/base"
import BoxLogin from "./BoxLogin"


const Comments = (props) => {
    const { url } = props
    
    const [comment, setComment] = useState('')

    //modal dialog for handle user not login
    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()
    const [commentsStore, setCommentStore] = useState([]) 
    
    const handleChange = event => {
        setComment(event.target.value)
    }

    const handlePostComment =  (e) => {
        e.preventDefault();
        //cek is login 
        const user = authFirebase.currentUser;
        if (user) {
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
        } else {
            setOpenModal(true)
        }
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }
       
    useEffect(() => {
        const id_url = md5(url)

        const recentPostsRef  =  query(ref(dbFirebase, `comments/${id_url}`))
        onValue(recentPostsRef, (snapshot) => {
            let data = null
            if (snapshot.exists()) {
                data = snapshot.val()
                const hasil = Object.keys(data).map((key) => [Number(key), data[key]][1]);
                setCommentStore(hasil)
            } else {
              console.log("No Comment available");
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
                                <Moment  fromNow unix>{userComment.created_at/1000}</Moment> 
                            </Typography>
                            <Typography variant='body2' sx={{ fontSize: '1rem', color: 'black', mt:1 }}>
                                {userComment.body}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )
        }) : null }
       
        <Dialog open={openModal} onClose={handleModalClose}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton size='small' onClick={handleModalClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                <Close />
            </IconButton>

            <BoxLogin 
                setOpenModal = {setOpenModal} 
                 fromComments = {true}
                 handlePostComment = {handlePostComment} />

        </DialogContent>
        
      </Dialog>
        </>
    )
}

export default Comments