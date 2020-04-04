import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,CardTitle,CardText,CardBody
 } from 'reactstrap';

export default function CovidKasus(props) {
  return (
    <Card className="CovidKasus text-white" color="primary">
      <CardBody>
        <CardTitle><h5>Terdampak</h5></CardTitle>
        <CardText>
          <div className="text-white">
            <span id="value">{props.kasus}</span>
            <span>  Kasus </span>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}
