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

const LabelModal = styled.label`
    display: block;
    /* font-weight: 500; 
    min-height: 40px;*/
    cursor: pointer;
    margin-bottom: 0.5rem;
`;

const TextoRojoModal = styled.p `
    font-size: 16px;
    margin-bottom: 0;
    color: ${colores.error};
`;

const BotonAmarilloModal = styled.button`
    height: 38px;
    line-height: 38px;
    width: 100px;
    background: ${colores.warning};
    color: #000;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: .1s ease all;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
`;

const BotonGrisModal = styled.button`
    height: 38px;
    line-height: 38px;
    width: 100px;
    background: ${colores.bgsecondary};
    color: #fff;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: .1s ease all;
    &:hover{
        box-shadow: 3px 0px 30px rgba(163,163,163,1);
    }
`;

export {
    LabelModal,
    TextoRojoModal,
    BotonAmarilloModal,
    BotonGrisModal
};