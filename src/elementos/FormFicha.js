import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
    borde: "#0075FF",
    error: "#F66060",
    exito: "#1ed12d",
    bgsecondary: "#6c757d",
    warning: "#ffc107",
    turquesa:"#007bff",
    celeste:"#d1ecf1"
}

const Titulo = styled.div` 
    font-size: 20px;
    font-weight: 900;
    font-family: 'Gentona--bold';
    min-height: 40px;
    color: ${colores.warning};
    text-align: center;
`;

const FormularioGrid = styled.form `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    @media (max-width: 780px){
        grid-template-columns: 1fr;
    }
`;
const Formulario = styled.form `

`;

const Label = styled.label`
    display: block;
    /* font-weight: 500; 
    min-height: 40px;*/
    cursor: pointer;
    margin-bottom: 0.5rem;
`;

const GrupoInput = styled.div`
    position: relative;
    z-index: 90;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 1px solid rgba(0,0,0,.2);
    text-transform: uppercase;

    &:focus {
        /*border: 3px solid ${colores.borde}*/
        outline: none;
        box-shadow: 0px 0px 3px #0d6efd;
    }
`;

const LeyendaError = styled.p `
    font-size: 12px;
    margin-bottom: 0;
    color: ${colores.error};
    display: none;
`;

const InputRadio = styled.input.attrs({ type: 'radio' })`
height: 25px;
width: 25px;
cursor: pointer;
position: absolute;
opacity: 0;
`;

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  position: relative;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 7px;
      height: 7px;
      margin: 24%;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
    &:checked + ${RadioButtonLabel} {
      background: #0d6efd;
      border: 1px solid #0d6efd;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 7px;
        height: 7px;
        margin: 24%;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: white;
      }
    }
  `}
`;


const InputCheck = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;



const SelectSkin = styled.select `
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 1px solid rgba(0,0,0,.2);
`;

const IconoValidacion=styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size:16px;
    opacity:0;
`;

const ContenedorTerminos = styled.div`
    grid-column: span 3;
    color: ${colores.turquesa};
    input {
        margin-right: 10px;
    }
`;


const PoliticasDatosPersonales = styled.div`
grid-column: span 3;
color: ${colores.turquesa};
input {
    margin-right: 10px;
}
`;

const ContenedorBotonCentrado = styled.div`
    display: flex;
    /*flex-direction: column;*/
    flex-direction: row;
    align-items: center;
    /*grid-column: span 3;*/
    margin-bottom: 1.7rem;
    margin-top: 1.3rem;
    width: 100%;
    padding: 0% 25% 0% 25%;
    @media (max-width: 768px) {
        flex-direction: column;
        /*width: 50%;*/
        padding: 0%;
    }
`;

const BotonAmarillo = styled.button`
    height: 45px;
    line-height: 45px;
    width: 100%;
    background: ${colores.warning};
    color: #000;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: .1s ease all;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
    @media (max-width: 768px) {
        flex-direction: column;
        width: 50%;
        align-items: center;
    }
`;


const BotonAzul = styled.button`
    height: 45px;
    line-height: 45px;
    width: 100%;
    background: ${colores.borde};
    color: #000;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: .1s ease all;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
    @media (max-width: 768px) {
        flex-direction: column;
        width: 50%;
        align-items: center;
    }
`;


const BotonGris = styled.button`
    height: 45px;
    line-height: 45px;
    width: 100%;
    background: ${colores.bgsecondary};
    color: #fff;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: .1s ease all;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
    @media (max-width: 768px) {
        flex-direction: column;
        width: 50%;
        align-items: center;
    }
`;

const MensajeExito = styled.p`
    font-size: 14px;
    color: ${colores.exito};
    display: none;
`;

const MensajeError = styled.div`
    height: 45px;
    line-height: 45px;
    background: ${colores.error};
    padding: 0px 15px;
    border-radius: 3px;
    grid-column: span 3;
    p{
        margin: 0;
    }
    b{
        margin-left: 10px;
    }
`;
const MensajeDocumentos = styled.div`
    background: ${colores.celeste};
    padding:15px;
    border-radius: 3px;
    grid-column: span 3;
    p{
        margin: 0;
    }
    b{
        margin-left: 10px;
    }
`;

export {
    Titulo,
    Formulario,
    FormularioGrid,
    Label,
    GrupoInput,
    Input,
    InputRadio,
    Wrapper,
    Item,
    RadioButton, 
    RadioButtonLabel,
    InputCheck,
    SelectSkin,
    LeyendaError,
    IconoValidacion,
    ContenedorTerminos,
    PoliticasDatosPersonales,
    ContenedorBotonCentrado,
    BotonAmarillo,
    BotonAzul,
    BotonGris,
    MensajeExito, 
    MensajeError,
    MensajeDocumentos
};