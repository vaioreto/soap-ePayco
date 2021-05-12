import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Modal, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../../../src/components/custom-button/CustomButton';
import { gql, useApolloClient } from '@apollo/client';

const PAGAR = gql`
    query pagar($sessionToken: ClienteWebTokenInput!, $monto: Float!, $descripcion: String!){
  
        pagar(sessionToken: $sessionToken, monto: $monto, descripcion: $descripcion){
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

const ModalPagar = ({ openModal, saldo, modalClose }) => {

    const client = useApolloClient();
    const [open, setOpen] = useState(false);
    const handleClose = () => modalClose(false);

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

            const { data } = await client.query({
                query: PAGAR,
                variables: {
                    "sessionToken": auth,
                    "monto": parseInt(dataForm['monto']),
                    "descripcion": dataForm['descripcion']
                }
            });

            swal("Token Enviado!", `Recibira un token de confirmacion de pago a su correo`, "success");

            setLoadingPago(false);            
            reset({ descripcion: "", monto: 0 });

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

                        <form role="form" onSubmit={handleSubmit(onSubmit)}>

                            <div>

                                <Controller
                                    name="monto"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: {
                                            message: "Este campo es requerido",
                                            value: true
                                        },
                                        validate: {
                                            validarMonto: (value) => {
                                                return value > 0 || 'La cantidad debe ser mayor a 0!';
                                            },
                                            validarMontomaximo: (value) => {
                                                return value <= saldo || `No puede superar la cantidad de ${saldo}`;
                                            }
                                        }
                                    }}
                                    render={({ field: { value, onChange }, fieldState }) => (

                                        <TextField
                                            type="number"
                                            error={fieldState.invalid}
                                            helperText={fieldState.error ? fieldState.error.message : null}
                                            id="outlined-monto"
                                            label="Cantidad*"
                                            name="monto"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />

                            </div>

                            <br />

                            <div>

                                <Controller
                                    name="descripcion"
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
                                            id="outlined-descripcion"
                                            label="Descripcion"
                                            name="descripcion"
                                            value={value}
                                            onChange={onChange}
                                        />

                                    )}
                                />

                            </div>


                            <CustomButton disabled={!formState.isValid || formState.isValidating} type="submit" color='blue'>
                                Pagar

                                    {(formState.isValidating && loadingPago) &&
                                    (
                                        <CircularProgress size={15} color="secondary" />
                                    )
                                }

                            </CustomButton>

                        </form>

                    </Box>
                </Fade>
            </Modal>

        </>

    );
}

export default ModalPagar;
