import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Modal, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../custom-button/CustomButton';
import { gql, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

const CONFIRMAR_PAGO = gql`
    mutation confirmarPago($sessionToken: ClienteWebTokenInput!, $tokenPago: String!){
  
        confirmarPagos(sessionToken: $sessionToken, tokenPago: $tokenPago){
            id
            pagos{
                id
                monto
                pagado
                descripcion
                createddAt
                updateddAt
            },
            billetera{
                id
                saldo
            }
        }
  
    }
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalConfirmarPago = ({ descripcion, openModal, modalClose }) => {

    const client = useApolloClient();
    const [open, setOpen] = useState(false);
    const handleClose = () => modalClose(false);
    const router = useRouter();

    const [loadingPago, setLoadingPago] = useState(false);
    const { handleSubmit, control, formState, reset } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {

        setOpen(openModal);

        return () => {
        }

    }, [openModal])

    const onSubmit = async dataForm => {

        try {

            const auth = JSON.parse(localStorage.getItem('auth'));

            setLoadingPago(true);
            handleClose();

            const { data } = await client.mutate({
                mutation: CONFIRMAR_PAGO,
                variables: {
                    "sessionToken": auth,
                    "tokenPago": dataForm['token']
                }
            });

            if (!data['confirmarPagos']) {
                swal("Problemas al confirmar pago!", `Token usado o incorrecto por favor verifique su correo electronico`, "warning");
            } else {
                swal("Pago Confirmado!", `Su pago a sido confirmado correctamente`, "success");
                router.push('/admin/consultar-saldo');
            }

            setLoadingPago(false);            
            reset({ token: "" });

        } catch (error) {
            console.error(error);
            swal("Problemas al guardar datos!", `Comunicate con un administrador del sistema`, "error");
            setLoadingPago(false);
            handleClose()
        }

    };

    return (

        <>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingPago}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {descripcion}
                        </Typography>

                        <br />

                        <form role="form" onSubmit={handleSubmit(onSubmit)}>

                            <div>

                                <Controller
                                    name="token"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: {
                                            message: "Este campo es requerido",
                                            value: true
                                        }
                                    }}
                                    render={({ field: { value, onChange }, fieldState }) => (

                                        <TextField
                                            error={fieldState.invalid}
                                            helperText={fieldState.error ? fieldState.error.message : null}
                                            id="outlined-token"
                                            label="Token de Pago"
                                            name="token"
                                            value={value}
                                            onChange={onChange}
                                        />

                                    )}
                                />

                            </div>


                            <CustomButton disabled={!formState.isValid || formState.isValidating} type="submit" color='blue'>
                                Confirmar
                        </CustomButton>

                        </form>

                    </Box>
                </Fade>
            </Modal>

        </>

    );
}

export default ModalConfirmarPago;
