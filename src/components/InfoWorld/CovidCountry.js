import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,CardTitle,CardText,CardBody,
  Table,Button
 } from 'reactstrap';

export default function CovidCountry(props) {
  return (
    <Card className="CovidCountry text-white" color="dark">
      <CardBody>
        <CardTitle><h5 className="text-center">Negara</h5></CardTitle>
        <div style={{"margin-top":"25px","overflow-y":"scroll","height":"250px"}}>
        <CardText>
          <Table responsive className="text-white">
            {
              (props.negara!==undefined)?<LoadTd SIW={props.SIW} negara={props.negara} />:null
            }
          </Table>
        </CardText>
        </div>
      </CardBody>
    </Card>
  );
}

function LoadTd(props){
  if(Object.keys(props.negara).length>0){
  return (
    <>
    {
      props.negara.map(function(item,i){
      if(item.iso3!==undefined){
        return (
          <tr>
            <td>
              <Button color="info" value={item.name+"?"+item.iso3} onClick={props.SIW}>{i+1}.{item.name}</Button>
            </td>
          </tr>
        );
      }else{
        return null;
      }
      })
    }
    </>
  );
}else{
  return (
    <tr>
      <td>
        <Button color="info">Indonesia</Button>
      </td>
    </tr>
  );
}

}
