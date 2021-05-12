
import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@material-ui/core';
import Admin from '../../layout/Admin';
import PaymentIcon from '@material-ui/icons/Payment';
import useConsultarSaldo from '../../src/hooks/useConsultarSaldo';
import ModalPagar from '../../src/components/modals/ModalPagar';


const ConsultarSaldo = (props) => {

    let saldo = useConsultarSaldo();
    const [openModal, setOpenModal] = useState(false);
    const handleClose = (e) => setOpenModal(e);

    const handleOpen = () => setOpenModal(true);

    return (
        <>
            <ModalPagar saldo={saldo} openModal={openModal} modalClose={(e)=>handleClose(e)} />

            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Balance Actual
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {saldo}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, pb: 1 }}>

                        <Tooltip title="Pagar" placement="top">
                            <IconButton onClick={handleOpen} aria-label="Pagar">
                                <PaymentIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <CardMedia
                    sx={{ width: 151 }}
                    image="/assets/images/image-dolar.jpeg"
                />
            </Card>
        </>
    );
}

ConsultarSaldo.layout = Admin

export default ConsultarSaldo;
