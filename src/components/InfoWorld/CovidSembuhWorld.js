import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,CardTitle,CardText,CardBody
 } from 'reactstrap';

export default function CovidSembuh(props) {
  return (
    <Card className="CovidSembuh text-white" color="success">
      <CardBody>
        <CardTitle><h5>Sembuh</h5></CardTitle>
        <CardText>
          <div className="text-white">
            <span id="value">{props.sembuh}</span>
            <span>  Orang </span>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}
