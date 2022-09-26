import React, { useEffect, useState } from 'react'
import {BotonAmarilloModal, BotonGrisModal, TextoRojoModal } from '../elementos/FormModal';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
  
const VentanaModal = ({ handleAceptarTyC,tipoServicio,valorTipoFicha}) => {

 const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
 const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;   
 
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const [PostTerminos,setPostTerminos]=useState('');

const handleAceptar = (e) => {
    handleAceptarTyC(true);
    handleClose();
}

const handleCancelar = (e) => {
    handleAceptarTyC(false);
    handleClose();
}
  
async function obtenerTerminosCondicones(tipoServicio,valorTipoFicha){
  
  let url=baseUrlGDO + "api/tipo_ficha_matricula"+ "/"+ valorTipoFicha +"/terminos"+"/"+tipoServicio
  const requestDocs = await axios.get(url,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO },
      withCredentials: true
    })
  const data = await requestDocs.data  
  setPostTerminos(data);
}

 
useEffect(() => {  
  obtenerTerminosCondicones(tipoServicio,valorTipoFicha)
}, [tipoServicio,valorTipoFicha]);


var terminos = PostTerminos.terminosCondiciones!=undefined? PostTerminos.terminosCondiciones.replace(/7px/g,""):undefined;
var notas = PostTerminos.notas!=undefined? PostTerminos.notas.replace(/7px/g,""):undefined;
   
  return (
      <>
        <a href="#" onClick={() => setShow(true)}>Acepto los términos y condiciones</a>
        <Modal
          size = "lg"
          show = {show}
          onHide = {handleClose}/*{() => setLgShow(false)}*/
          aria-labelledby = "example-modal-sizes-title-lg"
          scrollable = {true}
        >
          <Modal.Header closeButton>
            <Modal.Title id = "example-modal-sizes-title-lg">
              Condiciones Generales del Servicio de Enseñanza
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div dangerouslySetInnerHTML={{__html:`${terminos}`}} />

            <p class="p_modal text-justify">
              Notas:
              <div dangerouslySetInnerHTML={{__html:`${notas}`}} />             
            </p>

            <p class="p_modal text-justify">
              A la suscripción del presente documento, el postulante y/o apoderado aceptan y se someten a las condiciones descritas en el presente documento; asimismo, quedan obligados a dar fiel cumplimiento a todas las normas establecidas en los Reglamentos de UPN y en las disposiciones legales vigentes.
            </p>

          </Modal.Body>

          <Modal.Footer>
            <TextoRojoModal>Leer hasta el final</TextoRojoModal>
            <BotonGrisModal type="submit" onClick={handleCancelar}>Cancelar</BotonGrisModal>
            <BotonAmarilloModal type="submit" onClick={handleAceptar}>Aceptar</BotonAmarilloModal>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  export default VentanaModal;