import React,{useState,useEffect,useContext} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import CovidKasus from "../components/InfoWorld/CovidKasusWorld";
import CovidSembuh from "../components/InfoWorld/CovidSembuhWorld";
import CovidMeninggalDunia from "../components/InfoWorld/CovidMeninggalDuniaWorld";
import CovidPIE from "../components/InfoWorld/CovidPIE";
import CovidCountry from "../components/InfoWorld/CovidCountry";
import CovidStatistik from "../components/InfoWorld/CovidHarian";


import {urlContext,covidContext} from "../context";

import axios from "axios";

import {
  Container,Row,Col,
  Card,CardHeader,CardTitle,CardText,CardBody,
  Button
 } from 'reactstrap';


const Dashboard = (props) => {
  var baseUrl=useContext(urlContext);
  let covidVirus=useContext(covidContext);
  let [url]=useState(baseUrl);
  let [covid,setCovid]=useState(covidVirus);
  let [country,setCountry]=useState({path:"/countries/",label:"Indonesia",idNegara:"IDN",data:{}});
  let [data,setData]=useState({});
  let [daily,setDaily]=useState({});
  useEffect(()=>{

    UpdateCovid();
    setInterval(UpdateCovid,60000);

    function UpdateCovid() {
      let date=new Date();
      let waktu=`${date.getDate()-1}-${date.getMonth()}-${date.getFullYear()}`;
      let getstatusworld=axios({
        url:`${url}${country.path}${country.idNegara}`,
        method:"GET"
      });
      let getcountry=axios({
        url:`${url}${country.path}`,
        method:"GET"
      });
      let gd=`${url}/daily/${waktu}`;
      let getdaily=axios({
        url:`${gd}`,
        method:"GET"
      });
      axios.all([getstatusworld,getcountry,getdaily]).then(axios.spread((...res)=>{
        setCovid(res[0].data);
        setData(res[1].data);
        setDaily(res[2].data);
      })).catch(err=>{
        setCovid({});
        setData({});
        setDaily({});
      });
    }

  },[url,country.path,country.idNegara]);

  function DataDunia() {
    let getworld=axios({
      url:`${url}`,
      method:"GET"
    });
    axios.all([getworld]).then(axios.spread((...res)=>{
      setCountry({...country,"label":"Dunia"});
      setCovid(res[0].data);
    })).catch(err=>{
      setCovid({});
    });
  }

  function DataWorld(e) {
    let id=e.target.value.split("?");
    let getstatusworld=axios({
      url:`${url}${country.path}${id[1]}`,
      method:"GET"
    });
    axios.all([getstatusworld]).then(axios.spread((...res)=>{
      setCountry({...country,"data":{},"label":""});
      setCovid({});
      setCovid(res[0].data);
      setCountry({...country,"data":res[0].data,"label":id[0]});
    })).catch(err=>{
      setCovid({});
      setCountry({...country,"data":{}});
    });
  }

  if(Object.keys(covid).length>0){
    return (
        <Tampilan WIS={DataDunia} SIW={DataWorld} daily={(daily!==undefined)?daily:""} identitas={country.label} negara={(data.countries!==undefined)?data.countries:""} kasus={(covid.confirmed!==undefined)?covid.confirmed.value:"0"} sembuh={(covid.recovered!==undefined)?covid.recovered.value:"0"} meninggalDunia={(covid.deaths)?covid.deaths.value:"0"} />
    );
  }else{
    return (
      <Tampilan SIW="" daily="" negara={(data.countries!==undefined)?data.countries:""} kasus="0" sembuh="0" meninggalDunia="0" />
    );
  }
}


function Tampilan(props) {
  return (
    <Container fluid>
      <Row>
        <Col xs="12" sm="10" md="8" lg="8" xl="8">
          <Card className="CovidWorld">
          <CardHeader>
            <CardTitle color="warning"><h5>Informasi Kasus Covid 19 Seluruh {props.identitas}</h5></CardTitle>
            <Button color="success" onClick={props.WIS}>Show Information World</Button>
          </CardHeader>
          <CardBody>
            <CardText>

              <Row>
                <Col className="m-3">
                    <CovidKasus kasus={props.kasus} />
                </Col>

                <Col className="m-3">
                  <CovidPIE kasus={props.kasus} sembuh={props.sembuh} meninggalDunia={props.meninggalDunia} />
                </Col>
              </Row>

              <Row>

                <Col className="m-3">
                  <CovidSembuh sembuh={props.sembuh} />
                </Col>

                <Col className="m-3">
                  <CovidMeninggalDunia meninggalDunia={props.meninggalDunia} />
                </Col>
              </Row>

            </CardText>
          </CardBody>
          </Card>
        </Col>

        <Col>
        <Row>
          <Col xs="12" sm="10" md="12" lg="8" xl="11">

          <CovidCountry SIW={props.SIW} negara={props.negara} />

          </Col>
        </Row>
        <Row>
        <Col xs="12" sm="10" md="12" lg="8" xl="11">

        <CovidStatistik daily={props.daily} />

        </Col>
        </Row>
        </Col>
      </Row>

    </Container>
  );
}

export default Dashboard;
