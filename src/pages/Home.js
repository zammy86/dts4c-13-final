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
  FormControl,
} from "@mui/material";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { border } from "@mui/system";

const Home = () => {
  const [news, setNews] = useState([]);
  const [pop, setPop] = useState([]);
  const current = new Date();
  // const tokenApi = "24BQhBWdIUBg6WkepsnHjc8QhbogL9WxlMyPmZcX";
  // const tokenGuardian = "71f244b4-5281-43c4-9145-f3356fa32efb";
  // const tokenNyt = "Gfh1vUZGP3GWOuaJj3TGyKOXIeTthGA4";
  // const tokenNews = "f8084400b48a4a969b964f2fc32da37c";
  const tokenMedia = "83f30d5340dd5c25620145bfe33047f1";
  const countries = "us";
  const languages = "en";
  const limitNews = "8";
  const limitPop = "1";

  // Promise async await
  const getNews = async () => {
    try {
      const res = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${tokenMedia}&countries=${countries}&sources=${languages}&limit=${limitNews}`
      );
      console.log(res.data.data);
      setNews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getPop = async () => {
    try {
      const res = await axios.get(
        `//api.mediastack.com/v1/news?access_key=${tokenMedia}&countries=${countries}&sources=${languages}&limit=${limitPop}`
      );
      console.log(res.data.data[0]);
      setPop(res.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const latestNews = news.map((items, i) => (
    <Grid item md={3}>
      {items.image ? (
        <img src={items.image} alt="News Img"></img>
      ) : (
        <h4>This News Doesn't Have Image</h4>
      )}

      <h4>{items.title}</h4>

      <div>{items.published_at}</div>
      <div>{items.category}</div>
    </Grid>
  ));

  useEffect(() => {
    // getNews();
    // getPop();
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
              <img src={pop.image} alt="img"></img>
              <div className="hot-topic-info">
                <h2>{pop.title}</h2>
                <Grid container direction="row" spacing={4}>
                  <Grid item>{pop.published_at}</Grid>
                  <Grid item>{pop.category}</Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={5} className="hot-topic-text">
              <p>{pop.description}</p>
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
