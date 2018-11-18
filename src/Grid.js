import React,{ Component } from 'react';
import Card from './Card';
import escapeRegExp from 'escape-string-regexp';
import $ from 'jquery';
import './sass/style.scss';


class Grid extends Component {
    state = {
        cards: [],
        apiHits:0,
        totalLikes:0,
        query:'',
    }

    componentDidMount(){
        this.loadData();
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount(){
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage();
    }

    saveStateToLocalStorage() {
       // for every item in React state
       for (let key in this.state) {
         // save to localStorage
         localStorage.setItem(key, JSON.stringify(this.state[key]));
       }
    }

    hydrateStateWithLocalStorage() {
    // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);

            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              console.log(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
    }

    loadData = () => {
        const {cards} = this.state;
        let card;
        let apiHits = 0;
        //let self = this;
        const url = `http://www.mocky.io/v2/5bdd28dd32000075008c6227`;

        //fetch data from foursquare
        fetch(url)
        .then((response) => {
            apiHits += 1;
            response.json().then((content) => {
                if (response.status === 200) {
                    content.data.forEach((item, i) => {
                        card = {id : item.id, text: item.description, name: item.place, image:item.imageURL, ratings:item.ratings, likes:item.likes, liked: false};
                        cards.push(card);
                    });
                } else {
                    card = {text:"Sorry, Unable to retrieve data from Foursquare"}
                }
            // handle Errors
            this.setState({cards});
            this.setState({apiHits});
            this.totalLikes(cards);
            this.hydrateStateWithLocalStorage();
            })
        })

    }

    cardLiker = (e, target) => {
        let cards = this.state.cards;
        cards.forEach((card)=>{
            if(card.id === target.id){
                if(!target.liked){
                    card.likes += 1;
                    card.liked = true;
                    $(e.target).css('color','green');
                }else{
                    card.likes -= 1;
                    card.liked = false;
                    $(e.target).css('color','grey');
                }
            }
        });
        this.setState({cards});
        this.totalLikes(cards);
    }

    totalLikes = (cards) => {
        let totalLikes = 0;
        cards.forEach((card) => {
            totalLikes += card.likes;
        });
        this.setState({totalLikes});
    }

    updateQuery = (query) => {
        this.setState({query: query})
    }

    filterCards = (query, cards) => {
        let newPlaces;
        if (query){
            const match = new RegExp(escapeRegExp(query),'i');
            newPlaces = cards.filter((card)=>match.test(card.name));
        }
        else{
          newPlaces = cards;
        }
        console.log(newPlaces);
        return newPlaces;
    }

    render() {
        const {query,cards} = this.state;
        let searchedPlaces = this.filterCards(query, cards);
        return (
            <div className="main">
                <header>
                    <div className="head-content">
                        <div className="searchBar">
                            <label htmlFor="search">Enter the Wonder Name: </label>
                            <input id="search" tabIndex="0" aria-label="Search Wonders"  placeholder="Search By Name"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>
                        <div className="info">
                            <p><span>Total Likes:</span> {this.state.totalLikes}</p>
                            <p><span>API Hits:</span> {this.state.apiHits}</p>
                        </div>
                        <div className="filter">
                            <p> Sort By :
                            <select>
                            <option values="ratings"> Ratings </option>
                            <option value="likes"> Likes </option>
                            </select>
                            </p>
                        </div>
                    </div>

                </header>
                <div className="grid" role="grid">
                    <ul className="cards-list">
                        {searchedPlaces.map((card) =>
                            <Card
                                key = {card.id}
                                card = {card}
                                cardLiker= {this.cardLiker}
                            />
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Grid;
