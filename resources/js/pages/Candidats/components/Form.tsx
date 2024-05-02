import React, { useMemo } from 'react';
import { Candidat } from '@alTypes/Candidats';
import { Formik } from 'formik';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { CircularProgress, Fade, FormHelperText } from '@mui/material';
import SelectMission from '@components/SelectMission';
import { candidatsFormValidation } from '@schemaValidation/Candidats';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function CandidatForm({
    candidat,
    loading,
    onSubmit
}: {
    candidat?: Candidat,
    loading?: boolean,
    onSubmit: (values: Candidat, formikSubmitParams: {
        setSubmitting: Function,
    }) => void
}) {
    const isEditMode = useMemo(() => !!candidat, [candidat]);

    if (loading) {
        return <Fade
            in
            style={{
                transitionDelay: '800ms',
            }}
            unmountOnExit
        >
            <CircularProgress />
        </Fade>
    }

    return (
        <div>
            <Formik
                initialValues={candidat || {
                    firstname: '',
                    lastname: '',
                    email: '',
                    birthday: '',
                    missions: [],
                }}
                validate={async (values) => {
                    const dataToValidate = {
                        ...values,
                        birthday: values.birthday ? new Date(values.birthday).toISOString() : undefined
                    }
                    const schemaValidated = await candidatsFormValidation.validate(dataToValidate, { abortEarly: false })
                        .then(() => true)
                        .catch((err) => {
                            const errors = err.inner.reduce((acc: { [x: string]: any; }, curr: { path: string | number; message: any; }) => {
                                acc[curr.path] = curr.message;
                                return acc;
                            }, {} as Record<string, string>);
                            return errors;
                        });
                    return schemaValidated
                }}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                            <FormControl sx={{ width: 'calc(50% - 0.5em)' }} variant="outlined">
                                <TextField
                                    label="Prénom"
                                    name="firstname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstname}
                                />

                                {errors.firstname && touched.firstname && (
                                    <FormHelperText error>{errors.firstname}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ width: 'calc(50% - 0.5em)' }} variant="outlined">
                                <TextField
                                    label="Nom"
                                    name="lastname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastname}
                                />

                                {errors.lastname && touched.lastname && (
                                    <FormHelperText error>{errors.lastname}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ width: 'calc(50% - 0.5em)' }} variant="outlined">
                                <TextField
                                    label="Adresse email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <FormHelperText>L'adresse email doit être unique</FormHelperText>
                                {errors.email && touched.email && (
                                    <FormHelperText error>{errors.email}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl sx={{ width: 'calc(50% - 0.5em)' }} variant="outlined">
                                <TextField
                                    label="Date de naissance"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    name="birthday"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.birthday}
                                />
                                {errors.birthday && touched.birthday && (
                                    <FormHelperText error>{errors.birthday}</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{}}>
                                <SelectMission
                                    selectedMissions={values.missions}
                                    autocompleteProps={{
                                        onChange: (e, values) => {
                                            setFieldValue('missions', values);
                                        },
                                    }}
                                    inputProps={{
                                        name: "missions",
                                    }}
                                />
                                {errors.missions && touched.missions && (
                                    <FormHelperText error>{errors.missions}</FormHelperText>
                                )}
                            </FormControl>
                            <LoadingButton
                                size="large"
                                type="submit"
                                endIcon={<SendIcon />}
                                loading={isSubmitting}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>{isEditMode ? 'Modifier' : 'Créer'} le candidat</span>
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </div>
    );
}
