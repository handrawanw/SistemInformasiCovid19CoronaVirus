import React,{useState,useEffect,useContext,useRef} from 'react';
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
  let [error,setError]=useState(false);
  let setTimer=useRef();
  let detik=10;
  let dates=1;

  let date=new Date();
  let waktu=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()-dates}`;
  useEffect(()=>{

    UpdateCovid();

    setInterval(()=>{
      if(detik<=0){
        detik=10;
        UpdateCovid();
      }else{
        detik--;
      }
      if(setTimer.current!==null&&setTimer.current!==undefined){
        setTimer.current.innerText=detik;
      }
    },5500);


    function UpdateCovid() {
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
        setError(false);
        setCovid(res[0].data);
        setData(res[1].data);
        setDaily(res[2].data);
      })).catch(err=>{
        setError(true);
        setCovid({});
        setData({});
        setDaily({});
        console.error("UpdateCovid "+err);
      });
    }

  },[url,country.path,country.idNegara]);

  function UpdateCovid2() {
    let date=new Date();
    let waktu=`${date.getDate()-dates}-${date.getMonth()}-${date.getFullYear()}`;
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
      console.error("UpdateCovid2 "+err);
    });
  }

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
      UpdateCovid2();
    });
  }

  function DataWorld(e) {
    let id=e.target.value.split("?");
    let getstatusworld=axios({
      url:`${url}${country.path}${id[1]}`,
      method:"GET"
    });
    axios.all([getstatusworld]).then(axios.spread((...res)=>{
      setCovid(res[0].data);
      setCountry({...country,"data":res[0].data,"label":id[0]});
    })).catch(err=>{
      alert(err.response.data.error.message);
      setCovid({});
      setCountry({...country,"data":{}});
      UpdateCovid2();
    });
  }

if(error){

  return (
    <Card color="primary">
      <CardBody className="text-white">
        <CardTitle><h4>Sedang dalam perbaikan</h4></CardTitle>
        <CardText>Website ini aspek ketersediaan informasinya terganggu, mohon maaf atas ketidaknyamanan ini<br />
          Kami akan perbaiki secepatnya
        </CardText>
      </CardBody>
    </Card>
  )

}else{
  if(Object.keys(covid).length>0){
    return (
        <Tampilan WIS={DataDunia} timerSet={setTimer} dates={dates} updateTgl={(covid.lastUpdate)?covid.lastUpdate:"0"} SIW={DataWorld} daily={(daily!==undefined)?daily:""} identitas={country.label} negara={(data.countries!==undefined)?data.countries:""} kasus={(covid.confirmed!==undefined)?covid.confirmed.value:"0"} sembuh={(covid.recovered!==undefined)?covid.recovered.value:"0"} meninggalDunia={(covid.deaths)?covid.deaths.value:"0"} />
    );
  }else{
    return (
      <Tampilan SIW="" daily="" negara={(data.countries!==undefined)?data.countries:""} identitas="" kasus="0" sembuh="0" meninggalDunia="0" />
    );
  }
}

}

function Tampilan(props) {
  let wkt;
  if(props.updateTgl!==undefined){
    let date=new Date(props.updateTgl);
    let hari=["Ahad","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"];
    let bulan=["Januari","Febuari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    wkt=`Tanggal : ${hari[date.getDay()]}, ${date.getDate()-props.dates}-${bulan[date.getMonth()]} ${date.getFullYear()}, \n Jam : ${date.toLocaleTimeString()}, Total `;
  }
  return (
    <Container fluid>
      <Row>
        <Col xs="12" sm="10" md="8" lg="8" xl="8">
          <Card className="CovidWorld">
          <CardHeader>
            <CardTitle color="warning"><h5>Informasi Kasus Covid 19 Seluruh {props.identitas}</h5><br /><span>Informasi Terakhir, {(wkt!==undefined)?wkt:"Belum Update"}</span><br /><span>Realtime data : <span ref={props.timerSet}>10</span> Detik</span></CardTitle>
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

        <CovidStatistik daily={props.daily} waktu={(wkt!==undefined)?wkt:undefined} />

        </Col>
        </Row>
        </Col>
      </Row>

    </Container>
  );
}

export default Dashboard;
