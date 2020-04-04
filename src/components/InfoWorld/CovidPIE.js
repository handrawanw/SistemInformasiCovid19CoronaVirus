import React from 'react';
import {Pie} from "react-chartjs-2";

export default function CovidPIE(props){
  const data={
    labels:["Terdampak","Sembuh","Meninggal Dunia"],
    datasets:[{
      label:"Covid 19",
      data:[props.kasus,props.sembuh,props.meninggalDunia],
      backgroundColor:["Blue","Green","Red"],
      hoverBackgroundColor:["Blue","Green","Red"]
    }]
  };
  return (
    <Pie data={data} />
  );
}
