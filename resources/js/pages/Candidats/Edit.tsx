import axiosFetch from '@commons/axiosFetch';
import { useQuery } from '@tanstack/react-query';
import CandidatForm from './components/Form';
import { Box, CircularProgress, Fade, Paper } from '@mui/material';
import useFetchOneCandidat from '@hooks/candidats/useFetchOneCandidat';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateCandidatMutation from '@hooks/candidats/useUpdateCandidatMutation';
import { Candidat } from '@alTypes/Candidats';
import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function CandidatEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const candidat = useFetchOneCandidat(Number(id));
    const updateCandidate = useUpdateCandidatMutation();

    const handleFormSubmit = useCallback((candidat: Candidat, { setSubmitting }: { setSubmitting: Function }) => {
        updateCandidate.mutateAsync(candidat as Candidat)
            .then(() => {
                enqueueSnackbar('Candidat modifié avec succès', { variant: 'success' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    }, [updateCandidate, navigate, enqueueSnackbar]);


    if (candidat.isLoading) {
        return (
            <div>
                <h1>Editer un candidat</h1>
                <CircularProgress />
            </div>
        );
    }
    if (!candidat.data) {
        return (
            <div>
                <h1>Editer un candidat</h1>
                <Box p={2} component={Paper}>
                    <p>Candidat introuvable</p>
                </Box>
            </div>
        );
    }
    return (
        <div>
            <h1>Editer un candidat</h1>
            <Box p={2} component={Paper}>
                <CandidatForm
                    // Used for the key to force the re-render of the form when the candidat data changes asynchronously
                    key={JSON.stringify(candidat.data)}
                    candidat={candidat.data}
                    loading={candidat.isLoading}
                    onSubmit={handleFormSubmit}
                />
            </Box>
        </div>
    );
}
