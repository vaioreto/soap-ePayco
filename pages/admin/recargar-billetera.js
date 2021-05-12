import { Backdrop, Box, Card, CardContent, CardMedia, CircularProgress, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Admin from '../../layout/Admin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Controller, useForm } from 'react-hook-form';
import { gql, useApolloClient } from '@apollo/client';
import { decrypt } from '../../utils/global';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const RECARGAR_SALDO = gql`
    mutation recargarBilletera($documento: String!, $celular: String!, $monto: Float!){
        recargarBilletera(documento: $documento, celular: $celular, valor: $monto){
            id
            saldo
        }
    }
`;

const RecargarBilletera = (props) => {

    const router = useRouter();
    const client = useApolloClient();
    const [loadingRecargarSaldo, setLoadingRecargarSaldo] = useState(false);
    const { handleSubmit, control, reset } = useForm({
        mode: 'onChange'
    });


    const onSubmit = async dataForm => {

        try {

            const auth = JSON.parse(localStorage.getItem('auth'));
            const { documento, celular } = decrypt(auth);

            setLoadingRecargarSaldo(true);

            const { data } = await client.mutate({
                mutation: RECARGAR_SALDO,
                variables: {
                    documento,
                    celular,
                    "monto": parseInt(dataForm['monto'])
                }
            });

            if (data['recargarBilletera']['id'] == null || data['recargarBilletera']['saldo'] == null) {
                swal("Credenciales invalidas!", `Porfavor intente de nuevo o comuniquese con un administrador del sistema`, "warning");
            } else {
                swal("Saldo Recargado!", `Su saldo a sido recargado exitosamente`, "success");
                router.push('/admin/consultar-saldo');
            }



            setLoadingRecargarSaldo(false);
            reset({ monto: 0 });

        } catch (error) {
            console.error(error);
            swal("Problemas al recargar saldo!", `Comunicate con un administrador del sistema`, "error");
            setLoadingRecargarSaldo(false);
        }

    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingRecargarSaldo}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Card sx={{ display: 'flex' }}>
                <form role="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Recargar Saldo
                        </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <br />
                            </Typography>

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

                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, pb: 1 }}>

                            <Tooltip title="Recargar" placement="top">
                                <IconButton type='smontoubmit' /* onClick={handleOpen} */ aria-label="Pagar">
                                    <AddCircleIcon sx={{ height: 38, width: 38 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </form>
                <CardMedia
                    sx={{ width: 151 }}
                    image="/assets/images/image-dolar.jpeg"
                />
            </Card>

        </>
    );
}

RecargarBilletera.layout = Admin

export default RecargarBilletera;
