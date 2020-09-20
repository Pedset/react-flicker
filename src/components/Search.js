import React, { Component } from "react";
import Pictures from "./Pictures";
let numberCount = 0;
export default class Search extends Component {
  state = {
    title: "",
    id: [],
    pics: [],
    selected: [],
  };
  delSelected = (src) => {
    this.setState(
      {
        selected: this.state.selected.filter((el) => {
          if (el.src !== src) {
            return el;
          } else {
            document.querySelectorAll(".selected").forEach((elements) => {
              if (src === elements.src) {
                elements.classList.toggle("selected");
              }
            });
          }
        }),
      },
      () => {
        return new Promise((resolve, reject) => {
          resolve(this.state.selected.length);
          reject("fail");
        });
      }
    );
  };

  selectImg = (e) => {
    document.getElementById(e.target.id).classList.toggle("selected");

    let matchEl = false;
    for (let x = 0; x < this.state.selected.length; x++) {
      if (e.target.src === this.state.selected[x].src) {
        matchEl = true;
      }
    }
    if (matchEl) {
      this.setState({
        selected: this.state.selected.filter(
          (selected) => selected.src !== e.target.src
        ),
      });
    } else {
      this.setState({
        selected: [...this.state.selected, e.target],
      });
    }
  };

  searchImg = (title) => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b54580f369a7eeebecb2004dc429d08f&format=json&nojsoncallback=1&text=` +
        title
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let picArray = json.photos.photo.map((pic) => {
          let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
          this.setState({
            id: ++numberCount,
          });
          return (
            <img
              width="300"
              height="300"
              onClick={this.selectImg}
              id={numberCount}
              key={numberCount}
              alt={title}
              src={srcPath}
            ></img>
          );
        });
        this.setState({
          pics: picArray,
        });

        document.querySelectorAll("img").forEach((el) => {
          this.state.selected.forEach((ourSelected) => {
            if (
              el.src === ourSelected.src &&
              !el.classList.contains("fullscreen")
            )
              document.getElementById(el.id).classList.toggle("selected");
          });
        });
      })
      .catch((error) => {
        console.log("Oops! Something went wrong...");
        console.log(error);
      });
  };

  onChange = (e) => {
    this.setState({ title: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.title !== "") {
      this.searchImg(this.state.title);
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name=""
            placeholder="Type to search..."
            value={this.state.title}
            onChange={this.onChange}
          />

          <input type="submit" name="submit" />
        </form>
        <Pictures
          selectedPics={this.state.selected}
          delSelected={this.delSelected}
        />
        {this.state.pics}
      </div>
    );
  }
}
