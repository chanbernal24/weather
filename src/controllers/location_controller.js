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
        let textDescription = document.querySelector("#description")
        let textSunrise = document.querySelector("#sunrise")
        let textSunset = document.querySelector("#sunset")
        let textUVIndex = document.querySelector("#uvIndex")
        let textWindStatus = document.querySelector("#windStatus")
        let textPrecipitationChance = document.querySelector("#precipitationChance")
        let textHumidity = document.querySelector("#humidity")
        let textVisibility = document.querySelector("#visibility")
        let cardsContainer = document.querySelector('#week')
        let cards = await this.cardComponents()



        const [png, temp, dateTime, location, description, sunrise, sunset, highlights] = await Promise.all([
            this.locationModel.weatherImagePNGToday(),
            this.locationModel.getTemperatureToday(),
            this.locationModel.dateAndTimeToString(),
            this.locationModel.getLocation(),
            this.locationModel.getDescription(),
            this.locationModel.getSunriseToday(),
            this.locationModel.getSunsetToday(),
            this.locationModel.getHighlights(),

        ]);

        cardsContainer.append(cards)
        temperatureToday.textContent = `${temp}°`
        dayToday.textContent = dateTime["day"]
        timeToday.textContent = dateTime["time"]
        textLocation.textContent = location
        textDescription.textContent = description
        textSunrise.textContent = sunrise
        textSunset.textContent = sunset
        textUVIndex.textContent = highlights["uvIndex"]
        textWindStatus.textContent = highlights["windStatus"]
        textPrecipitationChance.textContent = highlights["precipitationProbabilty"]
        textHumidity.textContent = highlights["humidity"]
        textVisibility.textContent = highlights["visibility"]
        weatherImageToday.setAttribute('src', png)

    }

    cardComponents = async () => {
        let cardsArray = await this.locationModel.weeklyReportData()
        console.log(cardsArray, "dsadas")
        let cards = []
        cardsArray.map(card => {
            let htmldiv = card.renderCardComponent()
            cards.push(htmldiv)
            console.log(card)

        })


        return cards
    }
}

export default LocationController