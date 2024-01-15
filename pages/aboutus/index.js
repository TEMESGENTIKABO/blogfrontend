import { withRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Header from "../../components/Header";
import StickyFooter from "../../components/StickyFooter";

function aboutus() {
  return (
    <>
      <Header />

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 700,
          flexGrow: 1,
          marginTop: 12,
          marginBottom: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3" component="div">
                  About Us
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                  Hello guys! I am Temesgen

                  Welcome to <b>Zanta</b>, your number one source for all
                  things related to <b>Science, Tech, News, Entertainment, and Education</b>. We're
                  dedicated to giving you the very best of Science, Tech, News,
                  and Education with a focus on quality and real-world problem
                  solution.

                  Founded in 2022-03-19 by Temesgen, Zanta has come a long way
                  from its beginnings in <b>Addis Ababa</b> located in <b>Ethiopia</b>. When first started out, our passion for
                  Science, Tech, News, Education drove us to start our own
                  blog/website.

                  We hope you enjoy our blog as much as We enjoy offering them
                  to you. If you have any questions or comments, please don't
                  hesitate to contact us.

                  Sincerely, Temesgen
                </Typography>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>
      <StickyFooter />
    </>
  );
}

export default withRouter(aboutus);
