import React from "react";
import "./styles/home.scss";
import { useState, useEffect } from "react";
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
} from "@mui/material";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { border } from "@mui/system";

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

  useEffect(() => {
    // getNews();
    getNews2();
  }, []);
  return (
    <div className="home-section">
      <Navbar />
      <Container>
        <Grid container direction="column" className="hot-topics">
          <div className="title">
            <h1>Hot Topics</h1>
          </div>
          <Grid container spacing={0} direction="row" className="content">
            <Grid item xs={7} className="hot-topic-img">
              <img src={popimg3} alt="img"></img>
              <div className="hot-topic-info">
                <h2>{pop.title}</h2>
                <Grid container direction="row" spacing={4}>
                  <Grid item>{pop.published_dat}</Grid>
                  <Grid item>{pop.subsection}</Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={5} className="hot-topic-text">
              <p>{pop.abstract}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid>
            <h2>Latest News</h2>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex"
            alignItems="center"
          >
            {latestNews}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
