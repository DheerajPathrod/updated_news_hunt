import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

// import Spinner from "./Spinner";

export class News extends Component {

  static defualtProps = {
    country :'in',
    pageSize : 6,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number, 
    category : PropTypes.string
  }

  constructor(){
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebe4b3edd824e9a877c803dcd0175bb&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handleNextClick = async()=>{
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebe4b3edd824e9a877c803dcd0175bb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
    page: this.state.page+1,
    articles: parsedData.articles
    })
  }
  }

  handlePrevClick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebe4b3edd824e9a877c803dcd0175bb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
    page: this.state.page-1,
    articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="my-3 text-center">NewsHunt - Top headlines</h1>
        {/* <Spinner/> */}
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem
            
            title={element.title?element.title:""}
            description={element.description?element.description:""}
            imageURL={element.urlToImage}
            newsUrl={element.url}
          />
        </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
