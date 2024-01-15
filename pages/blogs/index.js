import React, { useState, useEffect } from "react";
import { Container, Toolbar } from "@mui/material";
import Link from "@mui/material/Link";
import Head from "next/head";
import { withRouter } from "next/router";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import Layout from "../../components/Layout";
import MainFeaturedPost from "../../components/MainFeaturedPost";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listBlogsWithCategoriesAndTags(skip, limit);
        if (data.error) {
          console.error("Error fetching data:", data.error);
        } else {
          setLoadedBlogs([...loadedBlogs, ...data.blogs]);
          setSize(data.size);
          setSkip(skip + limit);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [skip, limit]);

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={() => setLimit(limit + blogsLimit)} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showBlogs = (blogList) => {
    return blogList.map((blog, i) => (
      <div key={i} className="col-md-6" style={{ padding: "10px" }}>
        <div>
          <Card blog={blog} />
        </div>
      </div>
    ));
  };

  const showCategories = () => {
    return categories.map((c, i) => (
      <Link
        underline="none"
        color="inherit"
        noWrap
        key={i}
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

  const mainFeaturedPost = {
    title: APP_NAME,
    description: "Find What You Want",
    image: "https://source.unsplash.com/random",
    imageText: APP_NAME,
  };

  return (
    <React.Fragment>
      <Head>
        {/* Your existing head content */}
      </Head>
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <Container maxWidth="lg">
                <Toolbar
                  component="nav"
                  variant="dense"
                  sx={{ justifyContent: "space-between", overflowX: "auto" }}
                >
                  {showCategories()}
                </Toolbar>
              </Container>

              <div className="col-md-12 pt-3">
                <h5
                  style={{ color: "#0F9D58", paddingBottom: "10px" }}
                  className="display-4 font-weight-bold text-center"
                >
                  Blogs, News, and Articles
                </h5>
              </div>

              <MainFeaturedPost post={mainFeaturedPost} />
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">{showBlogs(blogs)}</div>
          </div>

          <div className="container-fluid">
            <div className="row">{showBlogs(loadedBlogs)}</div>
          </div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = async () => {
  try {
    const skip = 0;
    const limit = 8;
    const data = await listBlogsWithCategoriesAndTags(skip, limit);

    if (data.error) {
      console.error("Error fetching data:", data.error);
      return {
        blogs: [],
        categories: [],
        tags: [],
        totalBlogs: 0,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }

    return {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      totalBlogs: data.size,
      blogsLimit: limit,
      blogSkip: skip,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      blogs: [],
      categories: [],
      tags: [],
      totalBlogs: 0,
      blogsLimit: 8,
      blogSkip: 0,
    };
  }
};

export default withRouter(Blogs);
