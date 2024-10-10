import rainyImage from '../assets/rainy.png';
import cloudyImage from '../assets/cloudy.png';
import sunnyImage from '../assets/sunny.png';

class LocationData {
    constructor () {
        this.init()
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
            let data = await get.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    // returns the array of Days containing data about those days.
    mapWeatherDays = async() => {
        let jsonData = await this.getData()
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
            0 : "Sunday",
            1 : "Monday",
            2 : "Tuesday",
            3 : "Wednesday",
            4 : "Thursday",
            5 : "Friday",
            6 : "Saturday",
        }

        dayAndTime = {
            "day" : days[value],
            "time" : time

        }
        // console.log(dayAndTime)
        return dayAndTime
    }

    // returns the Day value in NUMBER and time value in NUMBER
    getDayAndTime = () => {
        let date = new Date()
        let timeToday = `${date.getHours()}:${date.getMinutes()}`
        let values = {
            "day" : `${date.getDay()}`,
            "time" : timeToday
        }
        // console.log(values)
        return values
    }

    getLocation = async () => {
        let data = await this.getData()
        return data["resolvedAddress"]

    }

    // returns the IMAGE PNG in STRING of what icon to be displayed TODAY.
    weatherImagePNG = async () => {
        let imageString = await this.weatherImageToday()
        let image;

        switch (imageString) {
            case "rain" : {
                image = rainyImage
                break;
            }
            case "cloudy" || "partly-cloudy" : {
                image = cloudyImage
                break
            }
            case "sunny" : {
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
}

export default LocationData