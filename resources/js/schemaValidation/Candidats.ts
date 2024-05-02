import * as yup from 'yup';

export const candidatsFormValidation = yup.object().shape({
    firstname: yup.string().required('Le prénom est obligatoire'),
    lastname: yup.string().required('Le nom est obligatoire'),
    email: yup.string().email('Le format de l\'email est incorrect').required('L\'email est obligatoire'),
    birthday: yup.date().required('La date de naissance est obligatoire').max(new Date(new Date().getFullYear() - 18, 0, 1), 'Le candidat doit être majeur'),
    missions: yup.array().of(yup.object().shape({
        id: yup.number().required('L\'id de la mission est obligatoire'),
    })).optional(),
});
