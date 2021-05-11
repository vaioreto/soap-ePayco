import React, { useEffect } from 'react';
import Auth from '../../layout/Auth';
import swal from '@sweetalert/with-react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../../src/components/custom-button/CustomButton';
import { Box, makeStyles, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({

});

const Registro = () => {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:767px)');
  const classes = useStyles();

  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  useEffect(() => {

    console.log(matches);

  }, [matches])

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
                name="emails"
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
                    id="outlined-basic"
                    label="Outlined*"
                    name="nombre"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="emails"
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
                    id="outlined-basic"
                    label="Outlined*"
                    name="nombre"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="emails"
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
                    id="outlined-basic"
                    label="Outlined*"
                    name="nombre"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="emails"
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
                    id="outlined-basic"
                    label="Outlined*"
                    name="nombre"
                    value={value}
                    onChange={onChange}
                  />

                )}
              />
            </Box>

            <Box sx={{ p: 1 }}>

              <Controller
                name="emails"
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
                    id="outlined-basic"
                    label="Outlined*"
                    name="nombre"
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
            <CustomButton type="submit" color='blue'>Crear Cliente</CustomButton>

          </Box>

        </form>

      </div>

    </>
  );
}

Registro.layout = Auth;

export default Registro;
