import * as React from "react";
import { useContext } from "react";
import "./styles/cardNews.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { Box } from "@mui/system";
import { CardActionArea } from "@mui/material";
import { ThemeContext } from "../App";

const CardNews = (props) => {
  const mode = useContext(ThemeContext);
  const { news, handleCardOnClick } = props;

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        id={mode.theme}
        className="card-latest"
        sx={{ height: 350, cursor: "pointer" }}
        onClick={() => handleCardOnClick(news.url)}
      >
        {news.image ? (
          <CardMedia
            sx={{ height: 150 }}
            component="img"
            alt={news.image}
            height="140px"
            src={news.image}
          />
        ) : null}
        <CardContent sx={{ alignItems: "center" }}>
          <Typography gutterBottom variant="h7" component="div">
            <div dangerouslySetInnerHTML={{ __html: news.title }} />
          </Typography>
          <Typography
            variant="subtitle1"
            id={mode.theme}
            className="update-latest"
            sx={{
              position: "absolute",
              bottom: 5,
              display: "flex",
              fontSize: "0.8rem",
            }}
            color="text.secondary"
          >
            <div style={{ paddingRight: "1.5rem" }}>
              <Moment fromNow>{news.published_at}</Moment>
            </div>
            <div style={{ textTransform: "uppercase" }}>{news.source}</div>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardNews;
