import React, { useState } from 'react';
import Admin from '../../layout/Admin';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import usePagosConfirmados from '../../src/hooks/useConfirmarpagos';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ModalConfirmarPago from '../../src/components/modals/ModalConfirmarPagos';


const ConfirmarPagos = (props) => {

    let pagos = usePagosConfirmados();

    const [openModal, setOpenModal] = useState(false);
    const [descripcionModal, setDescripcionModal] = useState('');
    const [idCompra, setIdCompra] = useState(0);
    const handleClose = (e) => setOpenModal(e);

    const handleOpen = () => setOpenModal(true);

    const handleListItemClick = (item) => {
        handleOpen();
        setDescripcionModal(`Confirmar pago de ${item['descripcion']} por un Total de ${item['monto']}$`);
        setIdCompra(item['id']);
    };

    return (
        <>

            <ModalConfirmarPago descripcion={descripcionModal} idCompra={idCompra} openModal={openModal} modalClose={(e) => handleClose(e)} />

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">

                    {pagos.length > 0 ? pagos.map((item, index) => (

                        <div key={index}>

                            <Tooltip title={!item['pagado'] ? "Confirmar Pago" : ''} placement="top">

                                <ListItem
                                    button
                                    onClick={() => !item['pagado'] ? handleListItemClick(item) : null}
                                >

                                    <ListItemIcon>

                                        {!item['pagado'] ? <CreditCardIcon /> : <CheckIcon />}

                                    </ListItemIcon>

                                    <ListItemText primary={`${item['descripcion']} ${(item['pagado'] ? '(pagado)' : '')}`} />


                                    <ListItemIcon edge="end" aria-label="comments">

                                        {item['monto']} <AttachMoneyIcon />

                                    </ListItemIcon>

                                    <Divider />

                                </ListItem>

                            </Tooltip>

                        </div>
                    )) : 'No posee historial de pagos confirmados o por confirmar'

                    }
                </List>

            </Box>
        </>
    );
}

ConfirmarPagos.layout = Admin

export default ConfirmarPagos;
