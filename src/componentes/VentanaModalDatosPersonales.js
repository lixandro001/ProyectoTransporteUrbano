import React, { useRef, useState, useEffect, useContext } from 'react';
import {BotonAmarilloModal, BotonGrisModal, TextoRojoModal} from '../elementos/FormModal';
import { Titulo, Formulario, FormularioGrid, Label, InputRadio, Wrapper, Item, RadioButton, RadioButtonLabel, InputCheck, ContenedorTerminos,PoliticasDatosPersonales, ContenedorBotonCentrado, BotonAmarillo, BotonGris, MensajeExito, MensajeError, MensajeDocumentos } from '../elementos/FormFicha';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import SimpleReactValidator from 'simple-react-validator';

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO; 
const VentanaModalDatosPersonales = ({ handleAceptarTyC,tipoServicio,valorTipoFicha,valorRadioButton}) => {
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;   
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const [PostTerminos,setPostTerminos]=useState('');
const [tipoPoliticaPersonales,settipoPoliticaPersonales]=useState('');
const [esobligatoriounvalor,setesobligatoriounvalor]=useState(true);

const handleAceptar = (e) => {
    handleAceptarTyC(true);
    handleClose();
}
const handleCancelar = (e) => {
    handleAceptarTyC(false);
    handleClose();
}

  
SimpleReactValidator.addLocale('es', {
    accepted: ':attribute debe ser aceptado.',
    after: ':attribute debe ser una fecha posterior a :date.',
    after_or_equal: ':attribute debe ser una fecha posterior o igual a :date.',
    alpha: ':attribute sólo debe contener letras.',
    array: ':attribute debe ser un conjunto.',
    before: ':attribute debe ser una fecha anterior a :date.',
    before_or_equal: ':attribute debe ser una fecha anterior o igual a :date.',
    between: ':attribute tiene que estar entre :min - :max:type.',
    boolean: 'El campo :attribute debe tener un valor verdadero o falso.',
    date: ':attribute no es una fecha válida.',
    date_equals: ':attribute debe ser una fecha igual a :date.',
    email: ':attribute no es un correo válido',
    in: ':attribute es inválido :values.',
    integer: ':attribute debe ser un número entero.',
    max: 'El :attribute no debe ser mayor a :max carácteres.',
    min: 'El :attribute debe ser de al menos :min carácteres.',
    not_in: ':attribute es inválido :values.',
    not_regex: 'El formato del campo :attribute no es válido.',
    numeric: 'El :attribute debe ser numérico.',
    regex: 'El formato de :attribute es inválido.',
    required: 'El campo :attribute es obligatorio.',
    size: 'El tamaño de :attribute debe ser :size:type.',
    string: 'El campo :attribute debe ser una cadena de caracteres.',
    url: 'El formato :attribute es inválido.',
  });

  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator({ locale: 'es', autoForceUpdate: { forceUpdate: forceUpdate } }))


const handleRadioButtonPoliticas = (event) => {
    const value = event.target.value;
    validator.current.purgeFields();
    
    settipoPoliticaPersonales(value);
     
    if (value == 1) {
      setesobligatoriounvalor(true);
      handleClose();
     } else if (value == 2) {
      setesobligatoriounvalor(false);
      handleClose();
     }
  };
 
async function obtenerPoliticasDatosPersonales(valorTipoFicha){
  let url=baseUrlGDO + "api/politicas_datos_personales"+ "/"+ valorTipoFicha 
  const requestDocs = await axios.get(url,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO },
      withCredentials: true
    })
  const data = await requestDocs.data  
  setPostTerminos(data);
}
 
useEffect(() => {  
    obtenerPoliticasDatosPersonales(valorTipoFicha)
}, [valorTipoFicha]);

 
 
 

var terminos = PostTerminos.politicasDatosPersonales!=undefined? PostTerminos.politicasDatosPersonales.replace(/7px/g,""):undefined;
 
  return (
      <>
        <a href="#" onClick={() => setShow(true)}>Ver Políticas de uso de Datos Personales</a>
        <Modal
          size = "lg"
          show = {show}
          onHide = {handleClose}/*{() => setLgShow(false)}*/
          aria-labelledby = "example-modal-sizes-title-lg"
          scrollable = {true}
        >
          <Modal.Header closeButton>
            <Modal.Title id = "example-modal-sizes-title-lg">
              Politicas de uso Datos Personales
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div dangerouslySetInnerHTML={{__html:`${terminos}`}} />

            {/* <p class="p_modal text-justify">
              Notas:
              <div dangerouslySetInnerHTML={{__html:`${notas}`}} />             
            </p> */}

            <p class="p_modal text-justify">
              A la suscripción del presente documento, el postulante y/o apoderado aceptan y se someten a las condiciones descritas en el presente documento; asimismo, quedan obligados a dar fiel cumplimiento a todas las normas establecidas en los Reglamentos de UPN y en las disposiciones legales vigentes.
            </p>
              </Modal.Body>
                <Modal.Footer>
                  <TextoRojoModal>Leer hasta el final</TextoRojoModal>           
                   <BotonGrisModal type="submit" onClick={handleCancelar}>Cerrar</BotonGrisModal>             
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  export default VentanaModalDatosPersonales;