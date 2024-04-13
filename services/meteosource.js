const baseUrl = 'https://www.meteosource.com/api/v1/free';
const apiKey = process.env.METEOSOURCE_API_KEY;

async function getPlaceId(city) {
    let locationResponse = await fetch(baseUrl + `/find_places?text=${city}&key=${apiKey}`);
    let location = await locationResponse.json();
    return location;
}

export async function currentWeather(city) {
    let location = await getPlaceId(city);

    let weatherResponse = await fetch(baseUrl + `/point?place_id=${location[0]['place_id']}&sections=current&key=${apiKey}`);
    let weatherData = await weatherResponse.json();

    return {
        city: city,
        temperature: weatherData['current']['temperature'],
        weather: weatherData['current']['weather']
    };
}
