import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Mission } from '@alTypes/Missions';
import useFetchAllMissions from '@hooks/missions/useFetchAllMissions';
import { useCallback } from 'react';
import dayjs from '@commons/dayjs';
import { Chip } from '@mui/material';

export default function SelectMission({
    selectedMissions,
    disabledMissions,
    inputProps,
    autocompleteProps,
    multiple,
}: {
    selectedMissions?: Mission[] | Mission,
    disabledMissions?: Mission[] | Mission,
    inputProps?: TextFieldProps,
    autocompleteProps?: { [key: string]: any },
    multiple?: boolean,
}) {
    const missions = useFetchAllMissions();
    const getMissionLabel = useCallback((option: Mission) => {
        return `${option.job_title} du ${dayjs(option.start_date).format('L')} au ${dayjs(option.end_date).format('L')}`
    }, []);
    const { key, onChange, ...rest } = inputProps || {};
    return (
        <Stack spacing={3}>
            <Autocomplete
                {...autocompleteProps}
                key={key}
                multiple={multiple ?? true}
                options={missions.data || []}
                getOptionKey={(option) => option.id}
                loading={missions.isLoading}
                getOptionDisabled={(option) => {
                    if (!disabledMissions) return false;
                    if (Array.isArray(disabledMissions)) {
                        return disabledMissions.some((mission: Mission) => mission.id === option.id);
                    }
                    return disabledMissions.id === option.id;
                }}
                getOptionLabel={getMissionLabel}
                value={selectedMissions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.id} label={option.job_title} />
                    ))
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Missions associées à ce candidat"
                            placeholder="Un mission pour captain america ?"
                            {...rest}
                        />
                    );
                }}
            />
        </Stack>
    );
}
