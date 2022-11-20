import { hover } from '@testing-library/user-event/dist/hover';
import React, { Component, Fragment } from 'react'

import { movies } from '../MovieData'
import axios from 'axios';

export class MovieList extends Component {

    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            movies:[],
            currPage:1,
            favourites:[]
        }
    }


    async componentDidMount(){
        const res = await axios.get( 
            `https://api.themoviedb.org/3/movie/popular?api_key=30bce940827bf706501d13b872cf2a2f&language=en-US&page=${this.state.currPage}`)
            let movieData = res.data
            console.log(movieData)


        this.setState({
            movies:[...movieData.results]
        })
    };

    changeMovies = async()=>{
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=30bce940827bf706501d13b872cf2a2f&language=en-US&page=${this.state.currPage}`
        )
        let movieData = res.data
        console.log(movieData)


        this.setState({
            movies:[...movieData.results]   
        });
    };

    handleNext=()=>{
        let tempArr = []

        for(let i=1; i<=this.state.parr.length+1 ; i++){
            tempArr.push(i)
        }

        this.setState({
            parr:[...tempArr],
            currPage:this.state.currPage+1,
        },
        this.changeMovies);
        
    };

    handlePrevious=()=>{
        if(this.state.currPage!=1){
            
            this.setState({
                currPage:this.state.currPage-1
            },
            this.changeMovies);
        };
        
    };

    handlePageClick=(value)=>{
        if(value!=this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies);
        };
    };
    handleFavourites=(movieObj)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app')||'[]')

        if(this.state.favourites.includes(movieObj.id)){
            oldData = oldData.filter((movie)=>movie.id!=movieObj.id)
        }
        else{
            oldData.push(movieObj)
        }

        localStorage.setItem("movies-app", JSON.stringify(oldData))
        console.log(oldData)

        this.handleFavouritesState()
    }

    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app"||'[]'))
        let temp = oldData.map((movie)=>movie.id)

        this.setState({
            favourites:[...temp]
        })
    }

    render() {
        
      
        return (
            <>
                <div>
                    <h3 className='text-center'><strong>Trending</strong></h3>
                </div>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieElem) => (
                            <div className='card movie-card' 
                            onMouseEnter={() => this.setState({ hover: movieElem.id })} 
                            onMouseLeave={() => this.setState({ hover: ""})}>
                                <img
                                    src= {`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} 
                                    style={{ height: '40vh', width: '20vw' }}
                                    className="card-img-top movie-img" alt="..." />

                                <h5 className="card-title movie-title">{movieElem.title}</h5>
                                <div className='button-wrapper' style={{display:'flex', justifyContent:'center'}}>
                                    {
                                        this.state.hover == movieElem.id && 
                                            <a  className="btn btn-primary movies-button text-center"
                                            onClick={()=>this.handleFavourites(movieElem)}>
                                            {
                                                this.state.favourites.includes(movieElem.id)? "Remove" : "Add to Favourites"
                                            }
                                                
                                                </a>
                                    }
                                </div>



                            </div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" onClick={this.handlePrevious}>
                                    Previous</a>
                            </li>
                            {
                                this.state.parr.map((value) => (
                                    <li class="page-item">
                                        <a class="page-link" onClick={()=> this.handlePageClick(value)}>

                                            {value}
                                        </a>
                                    </li>


                                ))
                            }
                            <li class="page-item">
                                <a class="page-link" onClick={this.handleNext}>
                                    Next</a>
                                </li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
export default MovieList