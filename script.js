document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById("city-input")
    const getWeatherBtn=document.getElementById("get-weather-btn")
    const weatherInfo=document.getElementById("weather-info")
    const cityNameDisplay=document.getElementById("city-name")
    const tempDisp=document.getElementById("temp")
    const descDisp=document.getElementById("desc")
    const errorMsg=document.getElementById("error-msg")

    const API_KEY="613a300cf5d3a908c8f2cf00fd2ae4b6";


    // async/await use kiya hai taaki API ka response aane tak wait kare
    // bina rukhe agla code na chale, error bhi catch ho sake
    getWeatherBtn.addEventListener('click',async ()=>{
        const city=cityInput.value.trim();
        if(!city) return;

         // it may throw an error
         // server/database is always in another continent

        try{
            const weatherData=await fetchWeatherData(city);  //
            displayWeatherData(weatherData);
        }
        catch(error){
            showError()
        }
    })

    async function fetchWeatherData(city){
        //gets data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response=await fetch(url);
        console.log(typeof response)
        console.log("RESPONSE: ", response);

        if(!response.ok){
            throw new Error("city not found")
        }

        const data=await response.json()
        return data;
    }

    function displayWeatherData(data){
        //display
        console.log(data);
        const {name,main,weather}=data;
        cityNameDisplay.textContent=name;
        tempDisp.textContent=`Temperature: ${main.temp}°C`;
        descDisp.textContent=`Weather: ${weather[0].description}`;

        //unlock the display
        weatherInfo.classList.remove('hidden')
        errorMsg.classList.add('hidden')

    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMsg.classList.remove('hidden')
    }

})