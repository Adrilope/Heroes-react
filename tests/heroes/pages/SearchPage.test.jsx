import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))


describe('Tests with <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks())

    
    test('should render correctly', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect( container ).toMatchSnapshot()
    })

    test('should show batman and input with the query string value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )        

        const input = screen.getByRole('textbox')
        expect( input.value ).toBe('batman')
        
        const img = screen.getByRole('img')
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg')

        const alert = screen.getByLabelText('alert-danger')
        expect( alert.style.display ).toBe('none')
    })

    test('should show the error if the hero was not found', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const alert = screen.getByLabelText('alert-danger')

        expect( alert.style.display ).toBe('')
    })

    test('should go to the new screen with the navigate', () => {
        const inputValue = 'superman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change( input, { target: { name: 'searchText', value: inputValue }})
        
        const form = screen.getByRole('form')
        fireEvent.submit( form )
        
        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`)
    })
})