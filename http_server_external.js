/**
 * Created by M.C on 2017/6/22.
 */
const http = require("http");
const url = require("url");
const qstring = require("querystring");

function sendResponse(weatherData, res) {
    let page = '<html>' +
        '<head>' +
            '<title>Get Weather Data</title>' +
            '<meta charset="utf-8">' +
        '</head>' +
        '<body>' +
            '<form method="post" >' +
                '<label>城市</label>' +
                '<input type="text" name="city"><br>' +
                '<input type="submit" value="Get Weather">' +
            '</form>';
    if (weatherData) {
        page += '<h1>Weather Info:</h1>' +
                '<p>' +
                    weatherData +
                '</p>';
    }

    page += '</body></html>';
    res.end(page);
}

function parseWeatherResponse(weatherResponse, res) {
    let weatherData = "";
    weatherResponse.on("data", function (chunk) {
        weatherData += chunk;
    });
    weatherResponse.on("end", function () {
        sendResponse(weatherData, res);
    });
}

function getWeather(city, res) {
    const options = {
        host: "api.openweathermap.org",
        path: '/data/2.5/weather?q=' + city+ '&appid=b1b15e88fa797225412429c1c50c122a1'
    };
    http.request(options, function (weatherResponse) {
        // console.log(weatherResponse);
        // 获得天气数据后，解析数据
        parseWeatherResponse(weatherResponse, res);
    }).end();
}

http.createServer(function (req, res) {
    console.log(req);
    if (req.method === "POST") {
        let reqData = "";
        req.on("data", function (chunk) {
            reqData += chunk;
        });
        req.on("end", function () {
            // 获取post过来的参数对象
            const postParameter = qstring.parse(reqData);
            // 根据参数对象中的city参数去获取天气信息
            getWeather(postParameter.city, res);
        });
    } else {
        sendResponse(null, res);
    }
}).listen(8080);