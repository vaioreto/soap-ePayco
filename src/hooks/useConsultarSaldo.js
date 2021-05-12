import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { decrypt } from '../../utils/global';


const CONSULTAR_SALDO = gql`
  query consultarSaldo($documento: String!, $celular: String!){
      
  consultarSaldo(documento: $documento, celular: $celular){
    billetera{
      id
      saldo
    }
  }
}
`;

const useConsultarSaldo = () => {

    const client = useApolloClient();

    const [saldo, setSaldo] = useState(0);

    useEffect(async () => {

        try {

            const auth = JSON.parse(localStorage.getItem('auth'));
            const { documento, celular } = decrypt(auth);

            const { data } = await client.query({
                query: CONSULTAR_SALDO,
                variables: {
                    documento,
                    celular
                }
            });
            
            setSaldo(data['consultarSaldo']['billetera']['saldo']);

        } catch (error) {
            swal("Problemas al consultar el saldo!", `Comunicate con un administrador del sistema`, "error");
        }

    }, []);

    return saldo;

};

export default useConsultarSaldo;