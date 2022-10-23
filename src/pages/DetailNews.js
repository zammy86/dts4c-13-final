import "./styles/detail.scss";
import Footer from "../components/Footer";
import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Comments from "../components/Comments";
import ImageNews from "../components/detailnews/ImageNews";
import { Navbar } from "../components/Navbar";
import { getCurrentNews } from "../redux/news";

const DetailNews = () => {
  const dispacth = useDispatch();
  const selectedNews = useSelector((state) => state.news.selectedNews);
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, _] = useState(searchParams.get("ref"));
  const navigate = useNavigate();
  useEffect(() => {
    // const url = searchParams.get('ref')
    if (url === "undefined") navigate("/");
    if (url && url !== undefined) {
      dispacth(getCurrentNews(url));
    }
  }, [dispacth, navigate, url]);
  return (
    <div className="detail-section">
      <Navbar />

      <Container>
        {selectedNews !== null && (
          <>
            <Grid container sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <CardMedia
                  sx={{ height: 400 }}
                  component="img"
                  src={selectedNews.imageNews}
                />
                <div>
                  {selectedNews.textNews !== null &&
                  selectedNews.textNews.length
                    ? selectedNews.textNews.map((berita, idx) => {
                        if (
                          berita.type === "p" &&
                          berita.props.children !== " "
                        ) {
                          return (
                            <Typography
                              key={idx}
                              variant={idx === 0 ? "h6" : "body2"}
                              sx={{ p: 1 }}
                            >
                              {berita.props.children}
                            </Typography>
                          );
                        }
                      })
                    : null}
                </div>
              </Grid>
            </Grid>
            <Grid container sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <Comments url={url} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};
export default DetailNews;
