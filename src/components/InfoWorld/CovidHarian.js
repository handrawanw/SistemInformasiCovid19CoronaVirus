import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,CardTitle,CardText,CardBody
 } from 'reactstrap';

import {Line} from "react-chartjs-2";

export default function CovidHarian(props) {
let lbl=[],dtst=[];

if(Object.keys(props.daily).length>0){
  props.daily.forEach((item,i)=>{
    if(item.provinceState!==undefined&&item.confirmed!==undefined){
      lbl.push(item.provinceState);
      dtst.push(item.confirmed);
    }
  });
}

  let data = {
  labels:lbl,
  datasets: [
    {
      label: 'Daily',
      data:dtst,
      color:"Black",
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
};
  return (
    <Card className="CovidHarian text-dark" color="link">
      <CardBody>
        <CardTitle><h5 className="text-center">Statistik</h5></CardTitle>
        <CardText>
          <Line style={{"color":"white"}} data={data} />
        </CardText>
      </CardBody>
    </Card>
  );
}
