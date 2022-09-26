import {useState, useEffect} from 'react';
import axios from 'axios';

export const useSelectDep = (url,versionCRM) => {
    const [dataDeps, setData] = useState([]);
    const [errorDep, setError] = useState(null);
    const [loadingDep, setLoading] = useState(false);   
    const apiKeyCRM = process.env.REACT_APP_APIKEY_CRM;

    useEffect(() => {
        const abortController=new AbortController();
        //permite que si el useSelect no funciona, se pueda abortar
        const signal = abortController.signal;

        const VarSelectData = async () => {
            var auth = {
                headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyCRM,"version-crm" : versionCRM }
            };
            axios
            .get(url, auth)
            .then((response) => {
                //const docs= response.data;
                //setPost(docs);
                const docs=[];
                for (let item in response.data) {
                    docs.push({
                        id: item,
                        key: response.data[item].guid_departamento,
                        value: response.data[item].nombre_departamento
                    })
                }
                setData(docs);
            })
            .catch((err) => console.log(err));
        }
        VarSelectData();
    }, [url]);
  return { dataDeps, errorDep, loadingDep };  
};