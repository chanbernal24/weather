import rainyImage from '../assets/rainy.png';
import cloudyImage from '../assets/cloudy.png';
import sunnyImage from '../assets/sunny.png';
import WeatherCardComponent from '../views/components/weather_card_component';

class LocationData {
    constructor() {
        this.init(),
        this.weatherData = this.getData()
    }

    init = async () => {
        await this.getData()
        await this.mapWeatherDays()
        await this.weatherImageToday()
    }


    // getting weather data.
    getData = async (location = "london") => {
        try {
            let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=CYGZ6QWJKWSPTT82C7JP2D9Z2&contentType=json`
            let get = await fetch(url)
            console.log(get.status)
            let data = await get.json()
            this.weatherData = data
            return data
        } catch (err) {
            console.log(err)
        }
    }

    // returns the array of DAYS containing DATA about those days.
    mapWeatherDays = async () => {
        let jsonData = await this.weatherData
        let days = jsonData["days"]
        let daysArray = []

        days.map(today => {
            daysArray.push(today)
        })
        // console.log(daysArray)
        return daysArray

    }

    // returns the array of TEMPERATURE in the NEXT 7 DAYS STARTING TODAY.
    temperatureWeeklyReport = async () => {
        let days = await this.mapWeatherDays()

        let temperatures = days.map(day => day["temp"])

        return temperatures

    }

    // returns the single string of what icon to be displayed TODAY.
    weatherImageToday = async () => {
        let days = await this.mapWeatherDays()
        // console.log(days[0]["icon"])
        return days[0]["icon"]
    }

    // returns the IMAGES ICON in array of STRINGS for WEEKLY REPORT
    weatherImagesWeeklyReport = async () => {

        try {
            let jsonDataDays = await this.mapWeatherDays()
            let images = []
            let daysLength = jsonDataDays.length - 1
    
            for (let i = 0; i <= daysLength; i++) {
                let image = this.weatherImagePNG(jsonDataDays[i]["icon"])
                images.push(image)
            }
            // console.log(images)
    
            return images
        } catch (err) {
            console.log(err)
        }
        
    }

    // returns the temperature TODAY
    getTemperatureToday = async () => {
        let data = await this.mapWeatherDays()
        console.log(data[0]["temp"])
        return data[0]["temp"]
    }


    // returns the WEEKLY REPORT'S DAYS IN AN ARRAY
    mapDateTime = async () => {
        let data = await this.mapWeatherDays()
        let days = []
        data.map(day => {
            let whatDay = new Date(day["datetime"])
            let whatDayInteger = whatDay.getDay()

            let theDay = this.dateToString(whatDayInteger)

            days.push(theDay)

        })

        // console.log(days)
        return days
    }

    // returns the DAY in STRING
    dateToString = (value) => {
        let days = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        }

        return days[value]
    }


    // returns the array of Weather Card Component Class
    weeklyReportData = async () => {
        let days = await this.mapDateTime()
        let obj = []
        let images = await this.weatherImagesWeeklyReport()
        let temps = await this.temperatureWeeklyReport()

        for (let i = 0; i <= days.length; i++) {
            let card = new WeatherCardComponent(days[i], images[i], temps[i])

            obj.push(card)
        }

        // console.log(obj)
        return obj

    }

    // returns the Day PARSED value in WORDS FROM A NUMBER and time value in NUMBER
    dateAndTimeToString = () => {

        let dayAndTime;
        let value = this.getDayAndTime().day
        let time = this.getDayAndTime().time
        let days = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        }

        dayAndTime = {
            "day": days[value],
            "time": time

        }
        console.log(value)
        return dayAndTime
    }

    // returns the Day value in NUMBER and time value in NUMBER
    getDayAndTime = () => {
        let date = new Date()
        let timeToday = `${date.getHours()}:${date.getMinutes()}`
        let values = {
            "day": `${date.getDay()}`,
            "time": timeToday
        }
        // console.log(values)
        return values
    }

    // returns the PLACE ADDRESS
    getLocation = async () => {
        let data = await this.weatherData
        return data["resolvedAddress"]

    }

    // returns the PLACE DESCRIPTION
    getDescription = async () => {
        let data = await this.weatherData
        return data["description"]
    }

    getUVIndex = async () => {
        let data = await this.weatherData
        return data["days"][0]["uvindex"]
    }

    getWindStatus = async () => {
        let data = await this.weatherData
        return data["days"][0]["windspeed"]

    }

    getPrecipitationProbability = async () => {
        let data = await this.weatherData
        return data["days"][0]["precipprob"]

    }

    getHumidity = async () => {
        let data = await this.weatherData
        return data["days"][0]["humidity"]

    }

    getVisibility = async () => {
        let data = await this.weatherData
        return data["days"][0]["visibility"]

    }

    getMoonphase = async () => {
        let data = await this.weatherData
        return data["days"][0]["0.25"]
    }

    getHighlights = async () => {
        const [uvIndex, windStatus, precipitationProbabilty, humidity, visibility, moonphase] = await Promise.all([
            this.getUVIndex(),
            this.getWindStatus(),
            this.getPrecipitationProbability(),
            this.getHumidity(),
            this.getVisibility(),
            this.getMoonphase(),
        ])

        const obj = {
            "uvIndex": uvIndex,
            "windStatus": `${windStatus}m/s`,
            "precipitationProbabilty": `${precipitationProbabilty}%`,
            "humidity": `${humidity}%`,
            "visibility": visibility,
            "moonphase": moonphase,
        }

        return obj
    }

    weatherImagePNG = (imageString) => {
        let image;

        switch (imageString) {
            case "rain": {
                image = rainyImage
                break;
            }
            case "partly-cloudy-day": {

            }
            case "clear-day": {

            }
            case "cloudy"  : {
                image = cloudyImage
                break
            }

            case "sunny": {
                image = sunnyImage
                break
            }
            default: {
                image = null
                break
            }
        }

        // console.log(image)
        // return the IMAGE PNG STRING
        return image
    }

    // returns the IMAGE PNG in STRING of what icon to be displayed TODAY.
    weatherImagePNGToday = async () => {
        let imageString = await this.weatherImageToday()
        let image;

        switch (imageString) {
            case "rain": {
                image = rainyImage
                break;
            }
            case "partly-cloudy-day": {

            }
            case "cloudy" || "partly-cloudy-day" || "clear-day": {
                image = cloudyImage
                break
            }

            case "sunny": {
                image = sunnyImage
                break
            }
            default: {
                image = sunnyImage
            }
        }

        console.log(image)
        // return the IMAGE PNG STRING
        return image

    }

    // returns the SUNRISE TIME TODAY
    getSunriseToday = async () => {
        let data = await this.weatherData
        return data["days"][0]["sunrise"]
    }

    // returns the SUNSET TIME TODAY
    getSunsetToday = async () => {
        let data = await this.weatherData
        return data["days"][0]["sunset"]
    }
}

export default LocationData