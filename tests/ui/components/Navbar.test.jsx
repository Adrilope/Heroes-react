import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';


const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}))


describe('Tests with <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks())


    test('should show the username', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter> 
            </AuthContext.Provider>
        )
        
        expect( screen.getByText('Juan Carlos') ).toBeTruthy()
    })

    test('should call the logout and navigate when the button is clicked', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter> 
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button')
        fireEvent.click( logoutBtn )

        expect( contextValue.logout ).toHaveBeenCalled()
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {"replace": true})
    })
})