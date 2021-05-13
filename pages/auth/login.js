import React, { useState } from 'react';
import Auth from '../../layout/Auth';
import swal from '@sweetalert/with-react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../../src/components/custom-button/CustomButton';
import { Backdrop, Box, Button, CircularProgress, LinearProgress } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useApolloClient, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
  
    login(email: $email, password: $password){
        cpt
        rest
    }
  
  }
`;

const Login = () => {
  const matches = useMediaQuery('(min-width:767px)');
  const client = useApolloClient();
  const router = useRouter();
  const [loadingRegis, setLoadingRegis] = useState(false);

  const { handleSubmit, control, formState } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async dataForm => {

    try {

      setLoadingRegis(true);

      const { data } = await client.query({
        query: LOGIN,
        variables: {
          email: dataForm['email'],
          password: dataForm['password']
        }
      });

      if(data['login'] == null){

        swal("Credenciales Incorrectas!", `Clave o Email Incorrecto, intente nuevamente`, "warning");

        setLoadingRegis(false);

      } else {
        swal("Felicidades!", `Credenciales Verificadas correctamente`, "success");

        localStorage.setItem('auth', JSON.stringify({cpt: data['login']['cpt'], rest: data['login']['rest']}));

        setLoadingRegis(false);

        router.push('/admin/consultar-saldo');

      }

    } catch (error) {
      console.error(error);
      setLoadingRegis(false);
      swal("Problemas al verificar credenciales!", `Comunicate con un administrador del sistema`, "error");
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
                name="email"
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
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    message: "Este campo es requerido",
                    value: true
                  },
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

          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <CustomButton disabled={!formState.isValid || formState.isValidating} type="submit" color='blue'>
              Login

              {formState.isValidating &&
                (
                  <CircularProgress size={15} color="secondary" />
                )
              }

            </CustomButton>

            <Link
                href={'/auth/registro'} passHref>
                <CustomButton
                    color="red"
                    component="a">
                    registro
                </CustomButton>
            </Link>

          </Box>

        </form>

      </div>

    </>
  );
}

Login.layout = Auth;

export default Login;
