import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuildMemberManagement from '../src/components/GuildMemberManagement/GuildMemberManagement';
import PartyFinder from '../src/components/PartyFinder/PartyFinder';
import App from './App';

export const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/guilds-members',
                    element: <GuildMemberManagement />,
                },
                {
                    path: '/party-finder',
                    element: <PartyFinder />,
                }]
        }]);


    return <RouterProvider router={router} />;
}