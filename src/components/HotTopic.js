// ** React Imports
import { useState, useContext } from "react";

// ** css
import "./styles/hotTopic.scss";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";

// ** Icons Imports
import Twitter from "mdi-material-ui/Twitter";
import CartPlus from "mdi-material-ui/CartPlus";
import Facebook from "mdi-material-ui/Facebook";
import Linkedin from "mdi-material-ui/Linkedin";
import GooglePlus from "mdi-material-ui/GooglePlus";
import ShareVariant from "mdi-material-ui/ShareVariant";
import { CardMedia } from "@mui/material";

// ** Theme Context
import { ThemeContext } from "../App";

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  //   display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  //   [theme.breakpoints.down('md')]: {
  //     borderBottom: `1px solid ${theme.palette.divider}`
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     borderRight: `1px solid ${theme.palette.divider}`
  //   }
}));

const HotTopic = (props) => {
  const mode = useContext(ThemeContext);
  const { news, handleCardOnClick } = props;
  const styles = {
    overlay: {
      position: "absolute",
      bottom: "20px",
      marginLeft: "1rem",
      color: "white",
    },
  };
  return (
    <Card
      id={mode.theme}
      className="hot-topic-section"
      sx={{
        height: 400,
        cursor: "pointer",
        border: "none",
        boxShadow: "none",
        position: "relative",
        backgroundColor: "transparent",
      }}
      onClick={() => handleCardOnClick(news.url)}
    >
      <Grid container spacing={8}>
        <StyledGrid item md={8} xs={12} position="relative">
          <div>
            <CardMedia
              component="img"
              alt={news.image}
              src={news.image}
              height="400"
            />
            <Typography variant="h4" style={styles.overlay}>
              {news.title}
            </Typography>
          </div>
        </StyledGrid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            pt: (theme) => [
              "0 !important",
              "0 !important",
              `${theme.spacing(6)} !important`,
            ],
            pl: (theme) => [
              `${theme.spacing(6)} !important`,
              `${theme.spacing(6)} !important`,
              "0 !important",
            ],
          }}
        >
          <CardContent>
            <Typography variant="h5">{news.description}</Typography>
          </CardContent>
          <CardActions className="card-action-dense">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* <Button>
                Read More
              </Button> */}
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotTopic;
