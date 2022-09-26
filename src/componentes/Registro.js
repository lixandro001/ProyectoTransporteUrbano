import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './../context/AuthProvider';
import axios from 'axios';

import { Helmet} from 'react-helmet';

import { Titulo, Formulario, FormularioGrid, Label, ContenedorTerminos, ContenedorBotonCentrado, BotonAmarillo} from '../elementos/FormFicha';
import { ContenedorCentrado, TextoAmarillo, TextoNegro} from '../elementos/FormRegistro';

import { Header, LogoOscuro } from '../elementos/Headers';
import { Footer } from '../elementos/Footers';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import '../estilos.css';

var ImgRegistro = require('./../wwwroot/images/img-upn2.png');


const Registro = ({ficha_matricula, urlapi, nombre}) => {
  
  return (
    <>
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
              <TextoNegro className="negrita">{nombre}</TextoNegro>
              <p></p>
              <TextoNegro>Gracias por tu envío, estás más cerca de empezar tu vida universitaria en la <TextoAmarillo>Universidad Privada del Norte</TextoAmarillo> y lograr tus sueños.</TextoNegro>
            </ContenedorCentrado>
          </Col>
        </Row>        
      </Container>
      <Footer>
        <p>© 2022 Universidad Privada del Norte</p>
      </Footer>
    </>         
  );
}

export default Registro;