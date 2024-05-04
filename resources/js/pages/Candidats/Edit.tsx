import CandidatForm from './components/Form';
import { Box, CircularProgress, Fade, Paper } from '@mui/material';
import useFetchOneCandidat from '@hooks/candidats/useFetchOneCandidat';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateCandidatMutation from '@hooks/candidats/useUpdateCandidatMutation';
import { Candidat } from '@alTypes/Candidats';
import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';
import MissionsList from '@components/MissionsList/index';
import useAddNewMissionToCandidateMutation from '@hooks/candidats/useAddNewMissionToCandidateMutation';
import { Mission } from '@alTypes/Missions';
import useRemoveMissionFromCandidateMutation from '@hooks/candidats/useRemoveMissionFromCandidateMutation';

export default function CandidatEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const candidat = useFetchOneCandidat(Number(id));
    const updateCandidate = useUpdateCandidatMutation();
    const addNewMissionToCandidate = useAddNewMissionToCandidateMutation();
    const removeMissionFromCandidate = useRemoveMissionFromCandidateMutation();

    const handleFormSubmit = useCallback((candidat: Candidat, { setSubmitting }: { setSubmitting: Function }) => {
        updateCandidate.mutateAsync(candidat as Candidat)
            .finally(() => {
                setSubmitting(false);
            });
    }, [updateCandidate, navigate, enqueueSnackbar]);

    const onMissionAdd = useCallback((mission: Mission) => {
        // If the mission straddles missions already assigned, an error will be thrown.
        if (candidat.data?.missions?.some((m) => {
            const missionStartDate = new Date(mission.start_date);
            const missionEndDate = new Date(mission.end_date);
            const mStartDate = new Date(m.start_date);
            const mEndDate = new Date(m.end_date);
            return (missionStartDate >= mStartDate && missionStartDate <= mEndDate)
                || (missionEndDate >= mStartDate && missionEndDate <= mEndDate);
        })) {
            return enqueueSnackbar('Impossible d\'ajouter une mission qui chevauche une mission déjà assignée', { variant: 'error' });
        }

        return addNewMissionToCandidate.mutateAsync({ candidatId: Number(id), missionId: mission.id })
            .then(() => {
                enqueueSnackbar('Mission ajoutée avec succès du candidat', { variant: 'success' });
            })
    }, [addNewMissionToCandidate, enqueueSnackbar]);

    const onMissionRemove = useCallback((mission: Mission) => {
        return removeMissionFromCandidate.mutateAsync({ candidatId: Number(id), missionId: mission.id })
            .then(() => {
                enqueueSnackbar('Mission supprimée avec succès du candidat', { variant: 'success' });
            })
    }, [addNewMissionToCandidate, enqueueSnackbar]);

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
                    autoSave
                    // Used for the key to force the re-render of the form when the candidat data changes asynchronously
                    key={JSON.stringify(candidat.data)}
                    candidat={candidat.data}
                    loading={candidat.isLoading}
                    onSubmit={handleFormSubmit}
                />
            </Box>
            <MissionsList
                missions={candidat.data.missions || []}
                loading={candidat.isLoading}
                onDelete={onMissionRemove}
                onAdd={onMissionAdd} />
        </div>
    );
}
