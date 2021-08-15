import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './card-style.css';
import { FadeTransform } from 'react-animation-components';

class Cards extends Component {
    render() {
        return (
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card className="carding shadow">
                <div className="overflow"><Card.Img className="card-img-top overflow" src={this.props.imgsrc} /></div>
                <Card.Body className="carding-body mb-1">
                    <Card.Title className="name">{this.props.name}</Card.Title>
                    <div className="text-center mt-3 mb-3"><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span><span className="fa fa-star fa-lg mr-2"></span></div>
                    <Card.Text className="carding-text mb-0">
                        <h6>{this.props.designation}</h6>
                        <p>{this.props.profile}</p>
                    </Card.Text>
                    <div className="mt-0 ml-2">
                            <a href={this.props.facebook} target="blank">
                            <span className="fa fa-facebook-official text-info icon fa-lg"></span></a>
                            <a href={this.props.instagram} target="blank">
                            <span className="fa fa-instagram text-danger fa-lg icon ml-3"></span></a>
                            <a href={this.props.twitter} target="blank">
                            <span className="fa fa-twitter-square text-primary icon fa-lg ml-3"></span></a>
                            <a href={this.props.github} target="blank">
                            <span className="fa fa-github-square text-dark fa-lg icon ml-3"></span></a>
                        </div>
                </Card.Body>
               
            </Card>
            </FadeTransform>
        );
    }

}

export default Cards;