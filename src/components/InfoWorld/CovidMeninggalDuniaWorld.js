import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,CardTitle,CardText,CardBody
 } from 'reactstrap';

export default function CovidMeninggalDunia(props) {
  return (
    <Card className="CovidMeninggalDunia text-white" color="danger">
      <CardBody>
        <CardTitle><h5>Meninggal Dunia</h5></CardTitle>
        <CardText>
          <div className="text-white">
            <span id="value">{props.meninggalDunia}</span>
            <span> Orang </span>
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}
