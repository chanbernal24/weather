import LocationData from "../models/location_data_model"

class LocationController {
    constructor() {
        this.onLoad()
    }

    locationModel = new LocationData()

    onLoad = async () => {
        window.addEventListener("load", async () => {
            await this.loadInformation()

        })
    }

    loadInformation = async () => {
        let weatherImageToday = document.querySelector("#weatherImageToday")
        let temperatureToday = document.querySelector("#temperatureToday")
        let dayToday = document.querySelector("#dayToday")
        let timeToday = document.querySelector("#timeToday")
        let textLocation = document.querySelector("#location")

        const [png, temp, dateTime, location] = await Promise.all([
            this.locationModel.weatherImagePNG(),
            this.locationModel.getTemperatureToday(),
            this.locationModel.dateAndTimeToString(),
            this.locationModel.getLocation()
        ]);

        temperatureToday.textContent = `${temp}°`
        dayToday.textContent = dateTime["day"]
        timeToday.textContent = dateTime["time"]
        textLocation.textContent = location
        weatherImageToday.setAttribute('src', png)
    }
}

export default LocationController