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
import Card from 'react-bootstrap/Card';
import ProgressIntoDialog from '../componentes/Progress/Progress'; 

const baseUrlCRM = process.env.REACT_APP_URL_API_CRM;
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;
 

 

const VerPdf = ({ficha_matricula, urlapi, nombre}) => {
    const [datapdf,setdatapdf]=useState('');
    const [loading, setLoading] = useState(false);

    var guid_oportunidad = localStorage.getItem("GUID");         
 

    function ConfigurarLinkDescarga() {
        setLoading(true);   
        console.log("entro al metodo de obtener pdf");
        console.log(guid_oportunidad);
     
          var auth = {
            headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO}
          };
          axios.get(baseUrlGDO + 'api/oportunidades/' + guid_oportunidad + '/fichas_matricula/pdf', auth)
            .then(response => {
              const data = response.data
              console.log(data.pdfBase64)
              setdatapdf(data.pdfBase64)
              console.log(baseUrlGDO + 'api/oportunidades/' + guid_oportunidad + '/fichas_matricula/pdf', auth);
              setLoading(false); 
              return response.data;
            })
            .catch(err => {
        
            });    
    }


    useEffect(() => {

        function loadRegistro() 
        {
        const response =  ConfigurarLinkDescarga(guid_oportunidad)
        return response
        }
          loadRegistro()

    }, [guid_oportunidad]);

    console.log(datapdf);


  
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

      <Container>
        <br/> <br/> <br/> <br/>
   
        <Container style={{ 'margin-top': '1rem', 'backgroundColor': '#fff', 'display':'flex',
  'alignItems': 'center', 'display': 'table','height':'400px' }}>
        <Row>
   
         
           {
             datapdf != '' ?
             <embed src={`data:application/pdf;base64,${datapdf}`} type="application/pdf" width="100%" height="600px" />
           :
             <div><center>Cargando.....</center></div> 
           }

         
           
        </Row>        
      </Container>
 
          
      </Container>
      <Footer>
        <p>© 2022 Universidad Privada del Norte</p>
      </Footer>

      <ProgressIntoDialog open={loading} />
    </>         
  );
}

export default VerPdf;