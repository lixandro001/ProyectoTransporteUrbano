import React from 'react';
import { Label, Input, GrupoInput, LeyendaError, IconoValidacion} from '../elementos/FormFicha';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const ComponenteInput = ({ estilo, tipo, label, placeholder, name, leyendaError, value, expresionRegular, onChange }) => {
   return (
        <div>
            {label && <Label htmlFor={name}>{label}</Label>}
            <GrupoInput>
                <Input
                    className = {estilo}
                    type={tipo}
                    placeholder={placeholder}
                    id={name}
                    value = {value}
                    pattern = {expresionRegular}
                    readOnly = {(estilo=="blocked")}
                    onChange = {(e)=>onChange(e)}
                />
                <IconoValidacion icon={faCheckCircle} />
                <LeyendaError>{leyendaError}</LeyendaError>
            </GrupoInput>
        </div>
   ); 
}

export default ComponenteInput;