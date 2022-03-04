import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from "../components/footer";

export default class Createpage extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    document.getElementById("file_name").style.display = "none";
    this.setState({ files: [...this.state.files, ...filesArr] });
  }

  render() {
    return (
      <div>
        <section className="jumbotron breadcumb no-bg">
          <div className="mainbreadcumb">
            <div className="container">
              <div className="row m-10-hor">
                <div className="col-12">
                  <h1 className="text-center">About LUV NFT</h1>
                  <p style={{ color: "white" }}>
                    Dear Hahz. Send me the design to build this page
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "100vh" }} />
        </section>
        <Footer />
      </div>
    );
  }
}
