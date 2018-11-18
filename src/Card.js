import React,{ Component } from 'react';
import $ from 'jquery';


class Card extends Component {

    openCardDetails = (target, card) => {
            $(target).parent().children('.image-details').css('display','none');
            $(target).parent().children('.card-details').css('display','block');
            // keep the color green after refresh
            if(card.liked){
                $(target).parent().children('.card-details').children('.heart').children('.fa').css('color','green');
            }
        }

    hideCardDetails = (target) => {
            $(target).parent().children('.image-details').css('display','flex');
            $(target).parent().children('.card-details').css('display','none');
    }

    renderStarRating = (rating) => {
        let html = [];
        let fullStars = Math.floor(rating);
        for(let i=0; i<fullStars; i++){
            html.push(<i className="fa fa-star" aria-hidden="true" key={i+10} ></i>);
        }
        if(rating-fullStars !== 0){
            html.push(<i className="fa fa-star-half-o" aria-hidden="true" key="0.5"></i>);
            fullStars++;
        }
        for(let j=fullStars; j < 5 ; j++){
            html.push(<i className="fa fa-star-o" aria-hidden="true" key={j+5} ></i>);
        }
        return html;
    }

    render(){
        const {card, cardLiker} = this.props;

        return (
            <li tabIndex="0" id={card.id} className="card" role="gridcell" onMouseEnter = {(e) => this.openCardDetails(e.target, card)} onTouchStart= {(e) => this.openCardDetails(e.target, card)} onMouseLeave = {(e) => this.hideCardDetails(e.target)}  onTouchEnd= {(e) => this.hideCardDetails(e.target)}>
                <img src={card.image} alt={card.name} />
                <div className="image-details">
                    <div className="ratings">
                        Rating: {this.renderStarRating(card.ratings)}
                    </div>
                    <div className="name">
                        {card.name}
                    </div>
                </div>
                <div className="card-details">
                    <div className="heart">
                        <i className="fa fa-gratipay"  onClick={(e) => cardLiker(e, card)}></i> <p>{card.likes}</p>
                    </div>
                    <div className="content">
                        <h3>{card.name}</h3>
                        <p>{card.text}</p>
                    </div>
                </div>

            </li>
        );

    }
}

export default Card;
