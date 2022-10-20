import React from "react";
import "./styles/news.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container, Grid } from "@mui/material";
import { Co2Sharp } from "@mui/icons-material";

const News = () => {
  const navigate = useNavigate();
  const param = useParams();
  //   console.log(parseInt(param.id));
  const [news, setNews] = useState([]);
  //   const [detail, setDetail] = useState({
  //     image: "",
  //     published_at: "",
  //     title: "",
  //     category: "",
  //   });
  const [detail, setDetail] = useState([]);
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
      //   setDetail(res.data.data[param["id"]]);
      //   console.log(res.data.data[param["id"]]);
      console.log(detail);
      if (param.id === undefined) {
      } else {
        setDetail(res.data.data[param["id"]]);
        console.log(res.data.data[param["id"]]);
        console.log(detail);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const latestNews = news.map((items, i) => (
    <Grid
      key={i}
      item
      container
      direction="column"
      justifyContent="space-between"
      alignItems="baseline"
      md={2}
      //   spacing={1}
      className="content"
      onClick={() => navigate(`/news/${i}`)}
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

  const detailNews =
    param.id === undefined ? (
      <h1>Hello</h1>
    ) : (
      <Grid>
        {detail.image ? (
          <Grid item className="detail-img-wrapper">
            <img src={detail.image} alt="News Img"></img>
          </Grid>
        ) : (
          <Grid item>
            <h4>This News Doesn't Have Image</h4>
          </Grid>
        )}
        <Grid item>
          <h1 className="detail-title">{detail.title}</h1>
        </Grid>
        <Grid item>
          {/* <div>{detail.published_at}</div> */}
          {/* <div>{detail.category}</div> */}
        </Grid>
        <Grid item>
          <h5 className="detail-description">{detail.description}</h5>
        </Grid>
      </Grid>
    );

  useEffect(() => {
    getNews();
    console.log(param.id);
    console.log(news[param["id"]]);
    console.log("detail", detail);
  }, [param]);

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
          {param.id === undefined ? latestNews : detailNews}
          {/* {latestNews} */}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default News;
