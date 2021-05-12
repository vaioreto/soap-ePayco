import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { decrypt } from '../../utils/global';


const PAGOS_CONFIRMADOS = gql`
  query getCliente($id: Int!) {
    getClienteById(id: $id){
        id
        pagos{
            id
            monto
            pagado
            descripcion
            createddAt
            updateddAt
        }
    }
}
`;

const usePagosConfirmados = () => {

    const client = useApolloClient();

    const [pagosConfirmados, setPagosConfirmados] = useState([]);

    useEffect(async () => {

        try {

            const auth = JSON.parse(localStorage.getItem('auth'));
            const { id } = decrypt(auth);

            const { data } = await client.query({
                query: PAGOS_CONFIRMADOS,
                variables: {
                    id
                }
            });

            setPagosConfirmados(data['getClienteById']['pagos'] == null ? [] : data['getClienteById']['pagos']);

        } catch (error) {
            swal("Problemas al consultar sus pagos confirmados!", `Comunicate con un administrador del sistema`, "error");
        }

    }, []);

    return pagosConfirmados;

};

export default usePagosConfirmados;