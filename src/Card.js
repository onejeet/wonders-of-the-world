import React,{ Component } from 'react';
import $ from 'jquery';


class Card extends Component {

    openCardDetails(target, card){
            $(target).parent().children('.image-details').css('display','none');
            $(target).parent().children('.card-details').css('display','block');
            // keep the color green after refresh
            if(card.liked){
                $(target).parent().children('.card-details').children('.heart').children('.fa').css('color','green');
            }
        }

    hideCardDetails(target){
            $(target).parent().children('.image-details').css('display','flex');
            $(target).parent().children('.card-details').css('display','none');
    }

    render(){
        const {card, cardLiker, cardsIndex} = this.props;

        return (
            <li tabIndex="0" id={card.id} className="card" role="gridcell" onMouseEnter = {(e) => this.openCardDetails(e.target, card)} onMouseLeave = {(e) => this.hideCardDetails(e.target)}>
                <img src={card.image} alt={card.name} />
                <div className="image-details">
                    <div className="ratings">
                        Rating: {card.ratings}
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
