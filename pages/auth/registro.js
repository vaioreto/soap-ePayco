import React, { useEffect } from 'react';
import Auth from '../../layout/Auth';
import swal from '@sweetalert/with-react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../../src/components/custom-button/CustomButton';
import { Box, CircularProgress, makeStyles, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useApolloClient, gql } from '@apollo/client';
import debounce from 'debounce-promise';
import { expRgEmail } from '../../utils/validation-inputs';

const useStyles = makeStyles({

});

const GET_EMAILS = gql`
  query verificar($consulta: String!) {
    
    verificar(consulta: $consulta)

  }
`;

const Registro = () => {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:767px)');
  const classes = useStyles();
  const client = useApolloClient();

  const { handleSubmit, control, getValues, formState } = useForm({
    mode: 'onChange'
  });

  const onSubmit = data => {
    console.log(data);
  };

  useEffect(() => {

  }, [])

  return (
    <>

      <div style={{
        width: matches ? '522px' : '100%'
      }}>

        <form onSubmit={handleSubmit(onSubmit)}>

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

                            //setVerifyEmail(true);

                            const { data } = await client.query({
                              query: GET_EMAILS,
                              variables: { "consulta": `documento = '${documento}'` }
                            });

                            //setVerifyEmail(false);

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

                            //setVerifyEmail(true);

                            const { data } = await client.query({
                              query: GET_EMAILS,
                              variables: { "consulta": `email = '${email}'` }
                            });

                            //setVerifyEmail(false);

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

          </Box>

        </form>

      </div>

    </>
  );
}

Registro.layout = Auth;

export default Registro;
