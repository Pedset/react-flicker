import React, { Component } from "react";
let userMsg = "Gallery is empty and no image is selected...";
let picIndex = 1;
let numCount = 0;
let listOfIds = [];
let listOfPics = [];
let galleryBtn = "Show gallery";
export default class Pictures extends Component {
  state = {
    id: [],
    pics: [],
    numberOfPics: 0,
    currentSrc: "",
  };
  goBack = () => {
    if (picIndex <= 0) {
      picIndex = numCount - 1;
    } else {
      picIndex--;
    }
    this.updateState();
  };
  goForward = () => {
    if (picIndex >= numCount - 1) {
      picIndex = 0;
    } else {
      picIndex++;
    }
    this.updateState();
  };
  updateState = () => {
    this.setState(
      {
        id: listOfIds,
        pics: listOfPics,
      },
      () => {
        let selection = document.querySelector(".fullscreen") !== null;
        if (selection) {
          this.setState({
            currentSrc: document.querySelector(".fullscreen").src,
          });
        }
      }
    );
    if (this.props.selectedPics.length === 0) {
      galleryBtn = "Show gallery";
      userMsg = "Gallery is empty and no image is selected...";
    } else {
      galleryBtn = "Refresh gallery";
      userMsg = "Refresh the gallery to add new selected image/images";
    }

    this.setState(
      {
        id: listOfIds,
        pics: listOfPics,
      },
      () => {}
    );
  };

  async deletePics() {
    try {
      await this.props.delSelected(this.state.currentSrc);
      this.getSelected();
    } catch (error) {
      console.log(error + " to delete pictures");
    }
  }
  deletePic = () => {
    let selection = document.querySelector(".fullscreen") !== null;
    if (selection) {
      this.deletePics();
    }
  };

  getSelected = () => {
    listOfIds = [];
    listOfPics = [];
    if (!(picIndex <= 0)) {
      picIndex--;
    }
    numCount = 0;
    const imgList = this.props.selectedPics;
    this.setState({
      numberOfPics: imgList.length,
    });

    imgList.forEach((el) => {
      listOfIds.push(numCount);
      listOfPics.push(
        `<img class="fullscreen" id="${numCount++}" key="${el.id}" alt="${
          el.alt
        }" src="${el.src}"></img>`
      );
    });

    this.updateState();
  };
  render() {
    return (
      <div>
        <button onClick={this.getSelected}>{galleryBtn}</button>
        <button onClick={this.deletePic}>
          Delete this picture from the gallery
        </button>
        <br></br>
        <p>{userMsg}</p>
        <br></br>
        <div
          className="my-custom-select"
          dangerouslySetInnerHTML={{ __html: this.state.pics[picIndex] }}
        ></div>
        <button className="arrowKey" onClick={this.goBack}>
          {" "}
          {"<--"}{" "}
        </button>
        <button className="arrowKey" onClick={this.goForward}>
          {" "}
          {"-->"}{" "}
        </button>
      </div>
    );
  }
}
