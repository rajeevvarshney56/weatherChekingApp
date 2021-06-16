const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const currentDay = document.getElementById('day');
const todayDate = document.getElementById('today_date');

const getInfo = async (event) => {
    event.preventDefault();
    const cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = `Please enter the city name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=22b8eea6876072ccbb6d411672c36099`;
            let response = await fetch(url);
            let respData = await response.json();
            const arrData = [respData];
            temp.innerText = arrData[0].main.temp;
            city_name.innerText = arrData[0].name + ", "+arrData[0].sys.country;
            let weatherStatus = arrData[0].weather[0].main;
            console.log(weatherStatus);
            if(weatherStatus == 'Sunny'){
                tempStatus.innerHTML = "<i class='fas fa-sun' style='color:yellow'></i>";
            }else if(weatherStatus == 'Rainy'){
                tempStatus.innerHTML = "<i class='fas fa-cloud-rain' style='color:yellow'></i>";
            }else{
                tempStatus.innerHTML = "<i class='fas fa-cloud' style='color:yellow'></i>";
            }
            datahide.classList.remove('data_hide');

        } catch {
            city_name.innerText = `Please enter the city name properly`;  
            // temp.innerText = "";
            // tempStatus.innerHTML = "";
            // tempStatus.innerHTML = "<i class='fas fa-cloud' style='color:yellow'></i>";
            datahide.classList.add('data_hide');
        }

    }
};
submitBtn.addEventListener('click', getInfo);

const getCurrentDay = ()=>{
    let currentTime = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return weekday[currentTime.getDay()];
}
//getCurrentDay();
const getCurrentTime = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear();

    let hours = now.getHours();
    let mins = now.getMinutes();
    
    let periods = "AM";
    if(hours > 11){
        periods = "PM";
        if(hours > 12){
            hours -= 12;
        }
    }
    if(mins < 10){
        mins = "0"+mins;
    }
    return `${month}  |  ${date}  |  ${hours}:${mins}${periods}`;
};
todayDate.innerText =   getCurrentTime();
currentDay.innerText = getCurrentDay();