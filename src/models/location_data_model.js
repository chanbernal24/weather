import rainyImage from '../assets/rainy.png';
import cloudyImage from '../assets/cloudy.png';
import sunnyImage from '../assets/sunny.png';

class LocationData {
    constructor() {
        this.init()
        this.weatherData = this.getData()
    }

    init = async () => {
        await this.getData()
        await this.mapWeatherDays()
        await this.weatherImageToday()
    }


    // getting weather data.
    getData = async () => {
        try {
            let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/manila?unitGroup=metric&key=CYGZ6QWJKWSPTT82C7JP2D9Z2&contentType=json"
            let get = await fetch(url)
            console.log(get.status)
            let data = await get.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    // returns the array of Days containing data about those days.
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

    // returns the single string of what icon to be displayed TODAY.
    weatherImageToday = async () => {
        let days = await this.mapWeatherDays()
        // console.log(days[0]["icon"])
        return days[0]["icon"]
    }

    // returns the temperature TODAY
    getTemperatureToday = async () => {
        let data = await this.mapWeatherDays()
        console.log(data[0]["temp"])
        return data[0]["temp"]
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
        // console.log(dayAndTime)
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
        let data =  await this.weatherData
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
            "uvIndex" : uvIndex,
            "windStatus" : `${windStatus}m/s`,
            "precipitationProbabilty" : `${precipitationProbabilty}%`,
            "humidity" : `${humidity}%`,
            "visibility" : visibility,
            "moonphase" : moonphase,
        }

        return obj
    }

    // returns the IMAGE PNG in STRING of what icon to be displayed TODAY.
    weatherImagePNG = async () => {
        let imageString = await this.weatherImageToday()
        let image;

        switch (imageString) {
            case "rain": {
                image = rainyImage
                break;
            }
            case "partly-cloudy-day": {
                
            }
            case "cloudy" || "partly-cloudy-day": {
                image = cloudyImage
                break
            }
            
            case "sunny": {
                image = sunnyImage
                break
            }
            default: {
                image = null
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