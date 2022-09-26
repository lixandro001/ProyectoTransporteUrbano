import {useState, useEffect} from 'react';
import axios from 'axios';
export const useSelectDist = (url,versionCRM, departamentoId, provinciaId) => {
    console.log("llamado  ---" + departamentoId+ "  ---- " + provinciaId);
    const [dataDists, setData] = useState([]);
    const [errorDist, setError] = useState(null);
    const [loadingDist, setLoading] = useState(false);    
    const apiKeyCRM = process.env.REACT_APP_APIKEY_CRM;
    
    useEffect(() => {
        if (departamentoId > 0 && provinciaId > 0 ||  departamentoId != '' && provinciaId != '') {
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
                            key: response.data[item].guid_distrito,
                            value: response.data[item].nombre_distrito
                        })
                    }
                    setData(docs);
                })
                .catch((err) => console.log(err));
            }
            VarSelectData();
        }
        else{
            setData([]);
        }
    }, [url]);
  return { dataDists, errorDist, loadingDist };  
};