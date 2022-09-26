
import styled from 'styled-components';

// const colores = {
//     borde: "#0075FF",
//     error: "#F66060",
//     exito: "#1ed12d",
//     bgsecondary: "#6c757d",
//     warning: "#ffc107",
//     turquesa:"#007bff",
//     celeste:"#d1ecf1"
// }

const BodyLogin = styled.body` 
    height: 100%;
    display: -ms-flexbox;  
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    width: 100%;
    max-width: 330px;
    margin: auto !important;
    input {
        width: 100%;
        height: 45px;
        line-height: 45px;
        padding: 0 40px 0 10px;
        transition: .3s ease all;
        border: 1px solid rgba(0,0,0,.2);
        text-transform: uppercase;
    }
    button {
        width: 100%;
    }
`;

export {
    BodyLogin
};

