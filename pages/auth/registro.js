import React, { useState } from 'react';
import Auth from '../../layout/Auth';
import swal from '@sweetalert/with-react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../../src/components/custom-button/CustomButton';
import { Backdrop, Box, CircularProgress, LinearProgress } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useApolloClient, gql } from '@apollo/client';
import debounce from 'debounce-promise';
import { expRgEmail } from '../../utils/validation-inputs';
import { useRouter } from 'next/router';
import Link from 'next/link';

const REGISTRO = gql`
  mutation createCliente ($input: ClienteInput!) {

    createCliente(input: $input){
      id
      email
    }
  
  }
`;

const GET_EMAILS = gql`
  query verificar($consulta: String!) {
    
    verificar(consulta: $consulta)

  }
`;

const Registro = () => {
  const matches = useMediaQuery('(min-width:767px)');
  const client = useApolloClient();
  const router = useRouter();
  const [loadingRegis, setLoadingRegis] = useState(false);

  const { handleSubmit, control, getValues, formState } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async dataForm => {

    try {

      setLoadingRegis(true);

      delete dataForm['reteat-password'];

      const { data } = await client.mutate({
        mutation: REGISTRO,
        variables: {
          "input": dataForm
        }
      });

      swal("Gracias por registrarte!", `Cliente registrado correctamente`, "success");

      setLoadingRegis(false);

      router.push('/auth/login');

    } catch (error) {
      console.error(error);
      swal("Problemas al guardar datos!", `Comunicate con un administrador del sistema`, "error");
      setLoadingRegis(false);
    }

  };

  return (
    <>
      <div style={{
        width: matches ? '522px' : '100%'
      }}>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingRegis}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <form role="form" onSubmit={handleSubmit(onSubmit)}>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              p: 1,
              m: 1,
            }}
          >
            <Box sx={{ p: 1 }}>

              <Controller
                name="documento"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    message: "Este campo es requerido",
                    value: true
                  },
                  validate: {
                    verificarDocumento: async (value) => {
                      return new Promise(resolve => {
                        debounce(
                          async documento => {

                            const { data } = await client.query({
                              query: GET_EMAILS,
                              variables: { "consulta": `documento = '${documento}'` }
                            });

                            if (data['verificar']) {
                              resolve('Documento ya utilizado');
                            } else {
                              resolve(null);
                            }
                          },
                          2000,
                          { leading: false }
                        )(value);
                      });
                    }
                  }
                }}
                render={({ field: { value, onChange }, fieldState }) => (

                  <TextField
                    error={fieldState.invalid}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    id="outlined-documento"
                    label="documento*"
                    name="Documento"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="nombre"
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
                    id="outlined-nombre"
                    label="Nombre*"
                    name="nombre"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    message: "Este campo es requerido",
                    value: true
                  },
                  pattern: {
                    value: expRgEmail,
                    message: "Email no valido"
                  },
                  validate: {
                    verificarEmail: async (value) => {
                      return new Promise(resolve => {
                        debounce(
                          async email => {

                            const { data } = await client.query({
                              query: GET_EMAILS,
                              variables: { "consulta": `email = '${email}'` }
                            });

                            if (data['verificar']) {
                              resolve('Email no disponible');
                            } else {
                              resolve(null);
                            }
                          },
                          2000,
                          { leading: false }
                        )(value);
                      });
                    }
                  }
                }}
                render={({ field: { value, onChange }, fieldState }) => (

                  <TextField
                    error={fieldState.invalid}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    id="outlined-email"
                    label="Email*"
                    name="email"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="celular"
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
                    id="outlined-celular"
                    label="Celular*"
                    name="celular"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    message: "Este campo es requerido",
                    value: true
                  },
                  validate: {
                    verificarLongitudClave: (value) => {
                      return value.length > 6 || '7 o mas caracteres!';
                    }
                  }
                }}
                render={({ field: { value, onChange }, fieldState }) => (

                  <TextField
                    type="password"
                    error={fieldState.invalid}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    id="outlined-password"
                    label="Clave*"
                    name="password"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="reteat-password"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    message: "Este campo es requerido",
                    value: true
                  },
                  validate: {
                    verificarPassword: (value) => {
                      const { password } = getValues();
                      return password === value || 'Las claves no coinciden!';
                    }
                  }
                }}
                render={({ field: { value, onChange }, fieldState }) => (

                  <TextField
                    type="password"
                    error={fieldState.invalid}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    id="outlined-repeat-password"
                    label="Repetir Clave*"
                    name="reteat-password"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <CustomButton disabled={!formState.isValid || formState.isValidating} type="submit" color='blue'>
              Crear Cliente

              {formState.isValidating &&
                (
                  <CircularProgress size={15} color="secondary" />
                )
              }

            </CustomButton>

            <Link href={'/auth/login'} passHref>
              <CustomButton component="a" color="red">
                Login
              </CustomButton>
            </Link>

          </Box>

        </form>

      </div>

    </>
  );
}

Registro.layout = Auth;

export default Registro;
