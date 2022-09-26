import styled from 'styled-components';
const colores = {
    borde: "#0075FF",
    error: "#F66060",
    exito: "#1ed12d",
    bgsecondary: "#6c757d",
    bgdark: "#343a40",
    warning: "#ffc107",
    turquesa:"#007bff",
    celeste:"#d1ecf1"
}

const Header = styled.nav`
    background-color: ${colores.bgdark};
    padding: 15px;
    
    p{
        margin: 0;
    }
`;
const LogoOscuro = styled.image`
    background-image: url('https://upn-repositorio-public.s3.amazonaws.com/logos/png/logo-upn-fondo-oscuro.png');
    width: 160px;
    height: 61px;
`;
const LogoClaro = styled.image`
    src = "https://upn-repositorio-public.s3.amazonaws.com/logos/png/logo-upn-sin-fondo.png";
    width: 251px;
    height: 90px;
    text-align: center !important;
`;
export { Header, LogoOscuro, LogoClaro};