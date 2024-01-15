import { Button } from "@mui/material";
import { MDBFooter } from "mdb-react-ui-kit";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function App() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <Button
            style={{
              width: "20em",
              backgroundColor: "#D3D3D3",
              color: "#000000",
            }}
            href="/search"
            startIcon={<SearchIcon />}
          >
            search ....
          </Button>
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className=" fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Zanta
              </h6>
              <p>Find What You Want</p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Social Media</h6>
              <p>
                <a href="#!" className="text-reset">
                  facebook
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  instagram
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Youtube
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="/blogs" className="text-reset">
                  Blogs
                </a>
              </p>
              <p>
                <a href="/" className="text-reset">
                  Categories
                </a>
              </p>
              <p>
                <a href="/contact" className="text-reset">
                  Contact
                </a>
              </p>
              <p>
                <a href="/aboutus" className="text-reset">
                  About us
                </a>
              </p>
              <p>
                <a href="/privacy" className="text-reset">
                  Privacy
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i>AddisAbaba, Ethiopia
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                help@
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +251
              </p>
              <p>
                <i className="fas fa-print me-3"></i> +251
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="/">
          Zanta.com
        </a>
      </div>
    </MDBFooter>
  );
}
