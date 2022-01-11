const imagesLimit = 100

async function getPhoto() {
    const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=${imagesLimit}`)
    return await res.json()
}

getPhoto().then(photo => {
    const randomId = Math.floor(Math.random() * imagesLimit)
    document.body.style.backgroundImage = `url('${photo[randomId].download_url}')`
    document.getElementById('photo-author').innerText = `Photo by: ${photo[randomId].author}`
    
}).catch(err => {
    console.log(err)
    document.body.style.backgroundImage = `url('/img/table.jpg')`
    document.getElementById('photo-author').innerText = `Something went wrong. Refresh the page.`
})

function getCurrentTime() {
    const date = new Date()
    document.getElementById('timer').textContent = date.toLocaleTimeString("pl-pl", {timeStyle: "short"})
}
setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    async function getWeather() {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c3565a43d4f7162df2e0011e9c8c33fa&units=metric`)
        return await res.json()
    }
    
    getWeather().then(weather => {
        document.querySelector('.weather').innerHTML = `
            <div class='right'>
                <img src='https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png' alt=''>
                <p class='temp'>${Math.floor(weather.main.temp)}</p>
            </div>
            <p class='city'>${weather.name}</p>
        `
    }).catch(err => console.log(err))
})

async function getCoins(coinName='bitcoin') {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinName}`)
    return await res.json()
}

function coinInnerHtml(coin) {
    document.querySelector('.coins').innerHTML += `
        <div class='coin'> 
            <img src=${coin.image.small} alt='' />
            <p class='price'>${coin.market_data.current_price.pln} zł</p>
        </div>
    `
}

getCoins().then(coin => coinInnerHtml(coin)).catch(err => console.log(err))
getCoins('cardano').then(coin => coinInnerHtml(coin)).catch(err => console.log(err))
getCoins('litecoin').then(coin => coinInnerHtml(coin)).catch(err => console.log(err))
getCoins('vechain').then(coin => coinInnerHtml(coin)).catch(err => console.log(err))

