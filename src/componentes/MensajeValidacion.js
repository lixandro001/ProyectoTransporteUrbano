
import React, { useEffect, useState } from 'react'

import '../wwwroot/css/uploadFile.css'
import { ContenedorCentrado, TextoAmarillo, TextoNegro} from '../elementos/FormRegistro';
import '../estilos.css';

import { Header, LogoOscuro } from '../elementos/Headers';
import { Footer } from '../elementos/Footers';

import { Helmet} from 'react-helmet';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

var ImgRegistro = require('./../wwwroot/images/img-upn2.png');



const MensajeValidacion =({mensaje}) =>{


    return (
        <>
   
    <div  className="management__content__finalizar__ok">
    <Helmet>
    <title>Ficha de Postulación</title>
    </Helmet>
    <Header></Header> 
    <Navbar bg="dark" expand="lg" fixed="top">
    <Navbar.Brand href="#">
    <img
     src = "https://upn-repositorio-public.s3.amazonaws.com/logos/png/logo-upn-fondo-oscuro.png"
     width = "160px"
     className = "d-inline-block align-top"
    />
    </Navbar.Brand>
    </Navbar>
    <Container style={{ 'margin-top': '8rem', 'backgroundColor': '#fff', 'display':'flex',
    'alignItems': 'center', 'display': 'table' }}>
    <Row>
    <Col sm={6}>
     <img
       src = {ImgRegistro}
       width = "90%"
       height = "100%"
       className = "d-inline-block"
     />
    </Col>
    <Col sm={6} style={{'display': 'table-cell', 'verticalAlign': 'middle'}}>
     <ContenedorCentrado>
       
       <p></p>
       <TextoNegro className="negrita">{mensaje}</TextoNegro>
     </ContenedorCentrado>
    </Col>
    </Row>        
    </Container>
    <Footer>
    <p>© 2022 Universidad Privada del Norte</p>
    </Footer>
    </div>  
    
        
        </>)
     

}

export default MensajeValidacion
 