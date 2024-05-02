import axiosFetch from '@commons/axiosFetch';
import { useQuery } from '@tanstack/react-query';
import CandidatForm from './components/Form';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Candidat } from '@alTypes/Candidats';
import { enqueueSnackbar } from 'notistack';
import useCreateCandidatMutation from '@hooks/candidats/useCreateCandidatMutation';

export default function CandidatAdd() {
    const navigate = useNavigate();
    const createCandidat = useCreateCandidatMutation();

    const handleFormSubmit = useCallback((candidat: Candidat, { setSubmitting }: { setSubmitting: Function }) => {
        createCandidat.mutateAsync(candidat as Candidat)
            .then((candidat: Candidat) => {
                navigate(`/candidats/${candidat.id}`);
                enqueueSnackbar('Candidat créé avec succès', { variant: 'success' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    }, [createCandidat, navigate, enqueueSnackbar]);

    return (
        <div>
            <h1>Ajouter un candidat</h1>
            <Box p={2} component={Paper}>
                <CandidatForm onSubmit={handleFormSubmit} />
            </Box>
        </div>
    );
}
