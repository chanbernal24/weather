import './/scss/styles.scss'
import * as bootstrap from 'bootstrap'
import './styles.css'


let getData = async () => {
    try {
        let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/manila?unitGroup=us&key=CYGZ6QWJKWSPTT82C7JP2D9Z2&contentType=json"
        let get = await fetch(url)
        let data = await get.json()
        console.log(data)
    } catch (err) {
        console.log(err)
    }

}

getData()

// let date = new Date("2024-10-09")
// let day = date.getDay();
// let whatDay;
// switch (day) {
//     case 3: 
//         whatDay = "Wednesday"
//         break
//     default:
//         console.log("err")
//         break
// }



// getData()
// console.log(whatDay)
