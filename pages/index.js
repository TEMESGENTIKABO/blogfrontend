import {
  Box,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Head from "next/head";
import { withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import { getCategories, singleCategoryForHome } from "../actions/category";
import Bloglisthome from "../components/BlogListHome";
import Layout from "../components/Layout";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../config";
import Homepagecard from "../components/blog/LatestBlogCards";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const Index = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  const mainFeaturedPost = {
    title: APP_NAME,
    description: "Find What You Want",
    image: "https://source.unsplash.com/random/?library",
    imageText: "Welcome to the World of Blogs, News, and Articles",
  };

  useEffect(() => {
    getCategories().then((data) => {
      if (data && data.error) {
        console.error("Error fetching categories:", data.error);
      } else if (data) {
        setCategories(data);

        let array = [];

        data.forEach((item, key) => {
          singleCategoryForHome(item.name).then((data) => {
            if (data && data.error) {
              console.error("Error fetching category:", data.error);
            } else if (data && data.blogs.length > 0) {
              array.push(...data.blogs);

              if (key === data.length - 1) {
                setBlogs(array);
              }
            }
          });
        });
      }
    });

    let skip = 0;
    let limit = 4;
    listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
      console.log("Data from listBlogsWithCategoriesAndTags:", data);
      if (data && !data.error) {
        setLatestBlogs(data.blogs);
      } else {
        console.error("Error fetching latest blogs:", data && data.error);
      }
    });
  }, []);

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link
        key={i}
        underline="none"
        color="inherit"
        noWrap
        variant="body2"
        href={`/categories/${c.slug}`}
        sx={{
          p: 1,
          flexShrink: 0,
          fontSize: "20px",
          fontFamily: "Monospace",
        }}
      >
        {c.name}
      </Link>
    ));
  };

  const showLatestBlogs = () => {
    return latestBlogs.map((blog, i) => (
      <div key={i} style={{ padding: "10px" }}>
        <div>
          <Homepagecard blog={blog} />
        </div>
      </div>
    ));
  };

  const head = () => <Head>{/* Your existing head content */}</Head>;

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <article className="overflow-hidden">
          <Container maxWidth="lg">
            <Toolbar
              component="nav"
              variant="dense"
              sx={{ justifyContent: "space-between", overflowX: "auto" }}
            >
              {showAllCategories()}
            </Toolbar>
          </Container>

          <div className="container" style={{ paddingTop: "20px" }}>
            <MainFeaturedPost post={mainFeaturedPost} />
            <div className="row">
              <div className="col-md-12 text-center pt-4 pb-5">
                <p className="lead">
                  Welcome to the World of Blogs, News, and Articles
                </p>
              </div>
            </div>
          </div>

          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <Typography component="div">
                  <Box
                    sx={{
                      fontSize: "h6.fontSize",
                      m: 1,
                      fontWeight: 800,
                      color: "#0F9D58",
                    }}
                  >
                    Latest Articles
                  </Box>
                </Typography>
                <Divider style={{ minWidth: "100%" }} />

                {showLatestBlogs()}
              </MDBCol>
              <MDBCol md="6">
                <Bloglisthome blogs={blogs} categories={categories} />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </article>
      </Layout>
    </React.Fragment>
  );
};

export default withRouter(Index);
