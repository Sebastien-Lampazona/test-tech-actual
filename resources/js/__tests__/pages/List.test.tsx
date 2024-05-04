import { render, waitFor } from "@testing-library/react"
import CandidatsList from "@pages/Candidats/List"
import MainWrapper from '../utils/mainWrapper'
import axios from 'axios'
import { Mock } from "vitest"
import candidatesList from "@mocks/candidatesList"

vi.mock('axios')

test("Renders the candidates list page", () => {
    render(
        <MainWrapper>
            <CandidatsList />
        </MainWrapper>
    )
    expect(true).toBeTruthy()
})

test("Render a proper list of candidates", () => {
    (axios.get as Mock).mockResolvedValue({
        data: candidatesList,
    });

    render(
        <MainWrapper>
            <CandidatsList />
        </MainWrapper>
    );

    waitFor(() => {
        expect(axios.get as Mock).toHaveBeenCalledTimes(1);
        expect(document.querySelectorAll('tbody tr').length).toBe(candidatesList.data.length);
        expect(document.querySelector('tbody tr:first-child td:first-child')?.textContent).toBe(`${candidatesList.data[0].firstname} ${candidatesList.data[0].lastname}`);
    });
});

test("Click on delete candidate button call the api", () => {
    (axios.get as Mock).mockResolvedValue({
        data: candidatesList,
    });

    render(
        <MainWrapper>
            <CandidatsList />
        </MainWrapper>
    );

    waitFor(() => {
        const deleteButton = document.querySelector('tbody tr:first-child td:last-child button');
        deleteButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(axios.delete as Mock).toHaveBeenCalledTimes(1);
        expect(axios.delete as Mock).toHaveBeenCalledWith(`/api/candidates/${candidatesList.data[0].id}`);
    });
});

test("Click on candidate row navigate to candidate detail page", () => {
    (axios.get as Mock).mockResolvedValue({
        data: candidatesList,
    });

    render(
        <MainWrapper>
            <CandidatsList />
        </MainWrapper>
    );

    waitFor(() => {
        (axios.get as Mock).mockReset();
        const firstRow = document.querySelector('tbody tr:first-child');
        firstRow?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(document.location.pathname).toBe(`/candidates/${candidatesList.data[0].id}`);
        expect(axios.get as Mock).toHaveBeenCalledTimes(1);
        expect(axios.get as Mock).toHaveBeenCalledWith(`/api/candidates/${candidatesList.data[0].id}`);
    });
});
