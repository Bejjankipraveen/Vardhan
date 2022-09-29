import { ThemeProvider } from '@mui/material'
import { createContext, ReactElement, ReactNode } from 'react'
import { User } from '../backend/user/user'
import theme from '../styles/theme'

export const UserContext = createContext<User | undefined>(undefined)

interface UserLayoutProps {
    children: ReactElement,
    user?: User,
    appbar?: ReactNode
}

const UserLayout = ({ children, user, appbar }: UserLayoutProps) => {
  return (
    <main>
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={user}>
                {appbar}
                <div style={{ padding: '10px' }}>{children}</div>
            </UserContext.Provider>
        </ThemeProvider>
    </main>
  )
}

export default UserLayout
