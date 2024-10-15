class WeatherCardComponent {
    constructor(day, imageSrc, temp) {
        this.day = day,
        this.imageSrc = imageSrc,
        this.temp = temp

    }


    renderCardComponent = () => {
        let cardContainer = document.createElement('div')
        cardContainer.setAttribute('class', 'card p-5 border border-0')
        cardContainer.setAttribute('style', 'width: 8rem;')

        let cardElementsContainer = document.createElement('div')
        cardElementsContainer.setAttribute('class', 'd-flex align-items-center justify-content-center flex-column')

        let day = document.createElement('h6')
        day.setAttribute('class', 'mb-3')
        day.textContent = this.day

        let imageWeatherIcon = document.createElement('img')
        imageWeatherIcon.setAttribute('src', this.imageSrc)
        imageWeatherIcon.setAttribute('class', 'mb-3')
        imageWeatherIcon.setAttribute('width', '52')
        imageWeatherIcon.setAttribute('height', '52')

        let temperature = document.createElement('small')
        temperature.setAttribute('class', 'fw-light')
        temperature.textContent = `${this.temp}°C`

        cardElementsContainer.append(day, imageWeatherIcon, temperature)
        cardContainer.appendChild(cardElementsContainer)

        return cardContainer

        
    }


}

export default WeatherCardComponent;