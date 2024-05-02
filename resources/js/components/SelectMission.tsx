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
    inputProps,
    autocompleteProps,
}: {
    selectedMissions?: Mission[],
    inputProps?: TextFieldProps,
    autocompleteProps?: Omit<AutocompleteProps<Mission, true, false, false>, 'options' | 'getOptionLabel' | 'getOptionSelected' | 'renderInput'>,
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
                multiple
                options={missions.data || []}
                getOptionKey={(option) => option.id}
                loading={missions.isLoading}
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
