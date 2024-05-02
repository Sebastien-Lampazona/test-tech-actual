import { MouseEvent, useCallback, useMemo } from 'react';
import axiosFetch from '@commons/axiosFetch';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Candidat } from '@alTypes/Candidats';
import { useNavigate } from 'react-router-dom';

import queryClient from '@commons/queryClient';
import useDeleteCandidatMutation from '@hooks/candidats/useDeleteCandidatMutation';

import './styles.css';
import useFetchAllCandidats from '@hooks/candidats/useFetchAllCandidats';

export default function CandidatsList() {
    const navigate = useNavigate();

    const deleteCandidat = useDeleteCandidatMutation();
    const candidats = useFetchAllCandidats();

    const onCandidatDetailClick = useCallback((candidat: Candidat) => {
        if (!queryClient.getQueryData(['candidats', candidat.id])) {
            queryClient.setQueryData(['candidats', candidat.id], candidat);
        }
        navigate(`/candidats/${candidat.id}`);
    }, [candidats]);

    const TableContent = useMemo(() => {
        if (candidats.isLoading) {
            return (
                <TableRow sx={{ padding: 2 }}>
                    <TableCell colSpan={4} component="th" scope="row">Chargement...</TableCell>
                </TableRow>
            );
        }

        if (candidats.isError) {
            return (
                <TableRow sx={{ padding: 2 }}>
                    <TableCell colSpan={4} component="th" scope="row">Erreur lors du chargement...</TableCell>
                </TableRow>
            );
        }

        if (!candidats.data?.length) {
            return (
                <TableRow sx={{ padding: 2 }}>
                    <TableCell colSpan={4} component="th" scope="row">Aucun candidat trouvé</TableCell>
                </TableRow>
            );
        }

        return candidats.data?.map?.((candidat: Candidat) => (
            <TableRow
                className='candidat-row'
                key={candidat.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={onCandidatDetailClick.bind(null, candidat)}
            >
                <TableCell component="th" scope="row">
                    {candidat.firstname} {candidat.lastname}
                </TableCell>
                <TableCell>{candidat.email}</TableCell>
                <TableCell align="right">{candidat.nb_missions}</TableCell>
                <TableCell align="right">
                    <LoadingButton
                        size="large"
                        loading={deleteCandidat.isPending}
                        aria-label="delete"
                        onClick={(event: MouseEvent) => {
                            event.stopPropagation();
                            deleteCandidat.mutate(candidat);
                        }}>
                        <DeleteIcon color="action" />
                    </LoadingButton>
                </TableCell>
            </TableRow>
        ));
    }, [candidats, deleteCandidat]);

    return (
        <div>
            <h1>Candidats</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Liste des candidats" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom/Prénom</TableCell>
                            <TableCell>Adresse email</TableCell>
                            <TableCell align="right">Nombre de mission attribué</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableContent}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab
                color="primary"
                href="/candidats/add"
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20
                }}>
                <AddIcon />
            </Fab>
        </div>
    );
}
