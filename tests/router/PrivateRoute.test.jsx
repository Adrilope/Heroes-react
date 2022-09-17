import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';


describe('Tests with <PrivateRoute />', () => {
    test('should show the children if user is authenticated', () => {

        Storage.prototype.setItem = jest.fn()

        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Juan Carlos'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Private Route')).toBeTruthy()
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
    })
})