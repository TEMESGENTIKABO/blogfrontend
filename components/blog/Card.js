import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  Avatar,
  Card as Card1,
  Divider,
  Fab,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import renderHTML from "react-render-html";
import ReactRoundedImage from "react-rounded-image";
import { API } from "../../config";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
  },
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const MyButton = styled(({ color, ...other }) => <Button {...other} />)({
  background: (props) =>
    props.color === "red"
      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: (props) =>
    props.color === "red"
      ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
      : "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
});

const Card = ({ blog }) => {
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Chip
        style={{ padding: "10px" }}
        label={c.name}
        component="a"
        href={`/categories/${c.slug}`}
        clickable
        color="primary"
        variant="outlined"
      />
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Chip
        style={{ padding: "10px" }}
        label={t.name}
        component="a"
        href={`/tags/${t.slug}`}
        clickable
        color="secondary"
        variant="outlined"
      />
    ));

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card1
          sx={{
            display: "flex",
            border: 1,
            borderRadius: 4,
            borderColor: "#000000",
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            color: "white",
            height: "180px",
            backgroundColor: "transparent",

            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            },
          }}
        >
          <CardMedia
            sx={{
              display: { sm: "block" },
              paddingTop: "18px",
              paddingLeft: "10px",
              paddingRight: "8px",
            }}
            alt="image"
          >
            <ReactRoundedImage
              image={`${API}/blog/photo/${blog.slug}`}
              roundedColor="#66A5CC"
              imageWidth="130"
              imageHeight="130"
              roundedSize="0"
              borderRadius="5"
            />
          </CardMedia>

          <CardContent sx={{ flex: 1 }}>
            <Link
              href={`/blogs/${blog.slug}`}
              underline="none"
              style={{
                color: "#3e2723",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "serif",
              }}
            >
              {blog.title}
            </Link>
            <Typography
              sx={{
                color: "#595855",
                fontSize: "12px",
                display: { xs: "none", sm: "block" },
              }}
            >
              {<EditIcon style={{ color: "#0F9D58" }} fontSize="small" />}{" "}
              <Link href={`/profile/${blog.postedBy.username}`}>
                {blog.postedBy.username}
              </Link>{" "}
              |{" "}
              {<AccessTimeIcon style={{ color: "#DB4437" }} fontSize="small" />}{" "}
              {moment(blog.updatedAt).fromNow()}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                textAlign: "left",
                fontSize: "12px",
                height: "100px",
                display: { xs: "none", sm: "block" },
              }}
            >
              {renderHTML(blog.excerpt)}
            </Typography>

            <ThemeProvider theme={darkTheme}>
              <Button
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  backgroundColor: "#e6e7ed",
                  color: "#4285F4",
                  display: { xs: "none", sm: "block" },
                }}
                href={`/blogs/${blog.slug}`}
              >
                Read More <ArrowRightAltIcon />{" "}
              </Button>
            </ThemeProvider>
          </CardContent>

          <CardActions></CardActions>
        </Card1>
      </Grid>
    </>
  );
};

export default Card;
