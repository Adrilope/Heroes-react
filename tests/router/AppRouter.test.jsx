import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';


describe('Tests with <AppRouter />', () => {
    test('should show login page if user is not authenticated', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login').length ).toBe(2)
    })

    test('should show the marvel page if user is athenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan Carlos'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1)
    })
})