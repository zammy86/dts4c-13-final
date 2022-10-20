import React from "react";
import "./styles/news.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container, Grid } from "@mui/material";

const News = () => {
  const [news, setNews] = useState([]);
  const tokenMedia = "83f30d5340dd5c25620145bfe33047f1";
  const countries = "us";
  const languages = "en";
  const limitNews = "15";
  const limitPop = "1";

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

  const latestNews = news.map((items, i) => (
    <Grid
      item
      container
      direction="column"
      justifyContent="space-between"
      alignItems="baseline"
      md={2}
      //   spacing={1}
      className="content"
    >
      {items.image ? (
        <Grid item>
          <img src={items.image} alt="News Img"></img>
        </Grid>
      ) : (
        <Grid item>
          <h4>This News Doesn't Have Image</h4>
        </Grid>
      )}
      <Grid item>
        <h4>{items.title}</h4>
      </Grid>
      <Grid item>
        <div>{items.published_at.split("T", 1)}</div>
        <div>{items.category}</div>
      </Grid>
    </Grid>
  ));

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Grid
          className="news-wrapper"
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          //   spacing={1}
        >
          {latestNews}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default News;
