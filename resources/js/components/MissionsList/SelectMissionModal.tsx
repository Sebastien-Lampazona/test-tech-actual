import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Mission } from '@alTypes/Missions';
import SelectMission from '@components/SelectMission';
import { FormHelperText } from '@mui/material';

export default React.forwardRef(function SelectMissionModal({
    onOpen,
    onClose,
    onMissionSelected,
    selectedMissions = [],
}: {
    onOpen?: () => void
    onClose?: () => void,
    onMissionSelected: (mission: Mission) => Promise<any> | void,
    selectedMissions?: Mission[],
}, ref: React.Ref<any>) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedMission, setSelectedMission] = React.useState(undefined as Mission | undefined);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
        onOpen?.();
    }, [onOpen]);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);

    React.useImperativeHandle(ref, () => {
        return {
            open() {
                handleOpen();
            },
            close() {
                handleClose();
            },
        };
    }, [handleOpen, handleClose]);

    const selectMission = React.useCallback(() => {
        setError(null);
        if (!selectedMission) {
            return setError('Veuillez selectionner une mission');
        }
        const handledMissionSelected = onMissionSelected(selectedMission);
        if (handledMissionSelected instanceof Promise) {
            handledMissionSelected
                .then(() => {
                    handleClose();
                })
                .catch((error: Error) => {
                    setError(error.message);
                });
        }
    }, [selectedMission, onMissionSelected, handleClose]);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Choisissez la mission à ajouter</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ marginBottom: 10 }}>
                        Veuillez selectionner la mission à ajouter à ce candidat. Attention au chevauchement de dates.
                    </DialogContentText>
                    <SelectMission
                        autocompleteProps={{
                            onChange: (e: any, value: Mission) => {
                                setSelectedMission(value)
                            },
                        }}
                        disabledMissions={selectedMissions}
                        multiple={false}
                        inputProps={{
                            name: "missions",
                        }}
                    />
                    {error && (
                        <FormHelperText error>{error}</FormHelperText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button type="button" onClick={selectMission}>Ajouter cette mission</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});
