// import React from "react";
import "./styles/home.scss";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  FormControl,
  Box,
} from "@mui/material";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { border } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectNews,
  getCurrentNews,
  getHotTopic,
  getNews,
} from "../redux/news";
import CardNews from "../components/CardNews";
import HotTopic from "../components/HotTopic";
import { Navigate, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const Home = () => {
  const [news, setNews] = useState([]);
  const [pop, setPop] = useState([]);
  const [popimg1, setPopImg1] = useState([]);
  const [popimg2, setPopImg2] = useState([]);
  const [popimg3, setPopImg3] = useState([]);
  const current = new Date();
  // const tokenApi = "24BQhBWdIUBg6WkepsnHjc8QhbogL9WxlMyPmZcX";
  // const tokenGuardian = "71f244b4-5281-43c4-9145-f3356fa32efb";
  const tokenNyt = "Gfh1vUZGP3GWOuaJj3TGyKOXIeTthGA4";

  // Promise
  //   const getNews = () => {
  //     axios
  //       .get(`https://api.thenewsapi.com/v1/news/all?api_token=${tokenApi}`)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   };

  // Promise async await
  const getNews2 = async () => {
    try {
      const res = await axios.get(
        // `https://content.guardianapis.com/search?api-key=${tokenGuardian}`
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Gfh1vUZGP3GWOuaJj3TGyKOXIeTthGA4`
      );
      console.log(res.data.results);
      console.log(res.data.results[0].media[0]["media-metadata"][0].url);
      setPopImg1(res.data.results[0].media[0]["media-metadata"][0].url);
      setPopImg2(res.data.results[0].media[0]["media-metadata"][1].url);
      setPopImg3(res.data.results[0].media[0]["media-metadata"][2].url);
      setNews(res.data.results);
      setPop(res.data.results[0]);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const latestNews = news.map((item, i) => (
    <Grid item md={3}>
      <img src={item.media[0]["media-metadata"][1].url} alt="News Img"></img>

      <h4>{item.title}</h4>

      <div>{item.updated}</div>
      <div>{item.source}</div>
    </Grid>
  ));

  const mode = useContext(ThemeContext);
  // console.log(mode.theme);

  const dispatch = useDispatch();
  const newStore = useSelector((state) => state.news);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getHotTopic());
    dispatch(getNews());
  }, [dispatch]);

  const handleCardOnClick = (url) => {
    dispatch(deselectNews());
    navigate(`/news?ref=${url}`);
  };

  return (
    <div className="home-section" id={mode.theme}>
      <Navbar />
      <Container className="content-section">
        <Grid container direction="column" className="hot-topics">
          <div className="title">
            <h1>Hot Topics</h1>
          </div>

          <HotTopic
            news={newStore.hotTopic}
            handleCardOnClick={handleCardOnClick}
          />
        </Grid>

        <Grid container>
          <Grid item>
            <div className="title">
              <h1>Latest News</h1>
            </div>
          </Grid>
        </Grid>
        <Grid container sx={{ alignContent: "space-between" }} spacing={3}>
          {newStore && newStore.news.length
            ? newStore.news.map((val, idx) => {
                return (
                  <Grid item xs={6} md={3} key={idx}>
                    <Box alignItems="center" justifyContent="center">
                      <CardNews
                        news={val}
                        handleCardOnClick={handleCardOnClick}
                      />
                    </Box>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
