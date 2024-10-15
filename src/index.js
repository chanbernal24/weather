import './/scss/styles.scss'
import * as bootstrap from 'bootstrap'
import './styles.css'
import LocationData from './models/location_data_model'
import LocationController from './controllers/location_controller'



// let locationController = new LocationController()

let locationModel = new LocationData()
// let data = new Date("2024-10-14")
console.log(locationModel.weeklyReportData())