import './App.css';
import { createTheme, ThemeProvider,Button } from '@mui/material';
import RTL from './RTL';
import CreateAirplaneFormDialog from './components/CreateAirplaneFormDialog/CreateAirplaneFormDialog'
import Plane from './classes/Plane'
import CreateTripFormDialog from './components/CreateTripFormDialog/CreateTripFormDialog';
import HeaderAdmin from './components/HeaderAdmin/HeaderAdmin';
import AdminPlaneTripManager from './pages/AdminPlaneTripManager/AdminPlaneTripManager';
import {PlaneContextProvider} from './contexts/PlaneContext'
import {TripContextProvider} from './contexts/TripContext'
export default function AdminPanel() {


	document.dir = 'rtl'
	const theme = createTheme({
		typography:{
			fontFamily:[
				'Roboto',
				'iransans',
			]
		},
		direction: 'rtl',
		palette:{
			
		}
	})


	return (
		<RTL>
			<ThemeProvider theme={theme}>
				<HeaderAdmin/>
				<PlaneContextProvider>
					<TripContextProvider>
						<AdminPlaneTripManager/>
					</TripContextProvider>
				</PlaneContextProvider>
			</ThemeProvider>
		</RTL>
	);
}
