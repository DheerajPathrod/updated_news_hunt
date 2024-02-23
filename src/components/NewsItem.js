import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsUrl } = this.props;
    return (
      <div>
        <div className="card my-3" style={{ width: "20rem" }}>
          <img
            src={
              !imageURL
                ? "http://www.lendacademy.com/wp-content/uploads/2015/05/Marketplace-Lending-News.jpg"
                : imageURL
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body my-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
