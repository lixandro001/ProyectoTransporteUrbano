import styled from 'styled-components';

const colores = {
    borde: "#0075FF",
    error: "#F66060",
    exito: "#1ed12d",
    bgsecondary: "#6c757d",
    warning: "#ffc107",
    turquesa:"#007bff",
    celeste:"#d1ecf1"
}

const ContenedorCentrado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 3rem;
`;

const TextoNegro = styled.label` 
    font-size: 16px;
    font-weight: 400;
    font-family: 'Gentona';
    text-align: center;
`;

const TextoAmarillo = styled.label` 
    font-size: 16px;
    font-weight: 900;
    font-family: 'Gentona--bold';
    color: ${colores.warning};
    text-align: center;
`;

export {
    ContenedorCentrado,
    TextoNegro,
    TextoAmarillo
};