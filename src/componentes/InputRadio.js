import React from 'react';
import { Label, InputRadio, GrupoInput, LeyendaError, IconoValidacion} from '../elementos/FormFicha';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInputRadio = ({tipo, label,placeholder, name, leyendaError, value1, value2}) => {
   return (
        <div>
            {label && <Label htmlFor={name}>{label}</Label>}
            <GrupoInput>
                <input type={tipo} value={value1} id={value1} name={name}/>
                <label htmlFor={value1}>{value1}</label>
                <input type={tipo} value={value2} id={value2} name={name}/>
                <label htmlFor={value2}>{value2}</label>
{/*                 <InputRadio type={tipo} value={value1} id={value1} name={name}/>
                <Label htmlFor={value1}>{value1}</Label>   
                <InputRadio type={tipo} value={value2} id={value2} name={name}/>
                <Label htmlFor={value2}>{value2}</Label>   */}   
            </GrupoInput>
            <LeyendaError>{leyendaError}</LeyendaError>
        </div>
   ); 
}

export default ComponenteInputRadio;