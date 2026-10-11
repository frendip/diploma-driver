import {Route, Routes} from 'react-router-dom';
import Map from '../pages/Map';
import Statistics from '../pages/Statistics';

function AppRouter() {
    return (
        <Routes>
            <Route index element={<Map />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    );
}

export default AppRouter;
