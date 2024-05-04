import { Mission } from '@alTypes/Missions';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import DeleteIcon from '@mui/icons-material/Delete';
import SelectMissionModal from './SelectMissionModal';
import React from 'react';

export default function MissionsList({
    missions,
    loading,
    onDelete,
    onAdd,
}: {
    missions: Mission[],
    loading?: boolean,
    onDelete: (mission: Mission) => Promise<any> | void,
    onAdd: (mission: Mission) => Promise<any> | void,
    }) {

    const addNewMissionModal = React.useRef<{open: () => void, close: () => void}>(null);

    return (
        <div>
            <h1>
                Liste des missions
                <Button onClick={() => {
                    addNewMissionModal.current?.open();
                }} variant="contained" color="primary" style={{
                    marginLeft: 10
                }}>Ajouter une mission</Button>
            </h1>
            {loading ? <CircularProgress /> : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titre</TableCell>
                                <TableCell>Date de début</TableCell>
                                <TableCell>Date de fin</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {missions.map((mission) => (
                                <TableRow key={mission.id}>
                                    <TableCell>{mission.job_title}</TableCell>
                                    <TableCell>{mission.start_date}</TableCell>
                                    <TableCell>{mission.end_date}</TableCell>
                                    <TableCell>
                                        <LoadingButton
                                            size="large"
                                            aria-label="delete"
                                            onClick={() => onDelete(mission)}>
                                            <DeleteIcon color="action" />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <SelectMissionModal ref={addNewMissionModal} onMissionSelected={onAdd} selectedMissions={missions} />
        </div>
    );
}
