import { CardMedia, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import Comments from "../components/Comments"
import LoadingSpinner from "../components/LoadingSpinner"
import { Navbar } from "../components/Navbar"
import { getCurrentNews } from "../redux/news"

const DetailNews = () => {
    
    const dispacth = useDispatch()
    const selectedNews = useSelector(state => state.news.selectedNews)
    const [searchParams, __] = useSearchParams();
    const [url, _] = useState(searchParams.get('ref'))
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if (url === 'undefined') navigate('/')
        setLoading(true)
        if (url && url !== undefined) {
            dispacth(getCurrentNews(url)).then(() => setLoading(false))
        } else {
            navigate('/')
        }
        setLoading(false)
    }, [dispacth, navigate, url])
    return (
    <div className="detail-section">

        <Navbar />
        
        <Container>
        {loading ? 
        <LoadingSpinner/> 
        :
        selectedNews !== null && 
        <>
            <Grid container sx={{pt: 2}}>
                <Grid item xs={12}>
                        <CardMedia  sx={{height: 400}}
                            component ='img'
                            src={selectedNews.imageNews}
                        />
                        <div>
                            {selectedNews.textNews !== null && selectedNews.textNews.length ? 
                                selectedNews.textNews.map((berita, idx) => {
                                    if (berita.type === "p"  && berita.props.children !== " ") {
                                        return (
                                            <Typography key={idx} variant={(idx === 0) ? "h6" : "body2"} sx={{p:1}} >
                                                {berita.props.children}
                                            </Typography>    
                                        )
                                    }
                                })
                            : null }
                        </div>
                </Grid>
            </Grid> 
            <Grid container sx={{pt: 2}}>
                <Grid item xs={12} sx={{mb:5}}>
                    <Comments url = {url} />
                        
                </Grid>
            </Grid>
        </> 
        }
        </Container>
    </div>
) 
}
export default DetailNews

