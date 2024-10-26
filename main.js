let input = document.querySelector(".in")
let arrow = document.querySelector(".arrow")
let locateMe = document.querySelector(".locate-me")
let ipAddress = document.querySelector(".ip h4")
let locate = document.querySelector(".location h4")
let timeZone = document.querySelector(".time-zone h4")
let ISP = document.querySelector(".ISP h4")
let latit = document.querySelector(".late h4")
let longit = document.querySelector(".long h4")
let Loca = document.querySelector(".loc h4")



let map = L.map('map').setView([30, 31], 13);
let tileLayer = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
let attribution = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

let firstTile = L.tileLayer(tileLayer, attribution)

firstTile.addTo(map)

let marker = L.marker([30, 31]).addTo(map);

console.log(timeZone)

function sendReq() {

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_hoK8hrrixwI0VDlIT0FH5EkH8zOBw&ipAddress=${input.value}`)

        .then((response) => response.json())

        .then((data) => {

            if (data.code === 422) {

                alert("Wrong Code")

            } else {
                console.log(map)
                ipAddress.innerHTML = data.ip
                locate.innerHTML = `${data.location.city}, ${data.location.region},${data.location.country}`
                timeZone.innerHTML = `UTC ${data.location.timezone}`
                ISP.innerHTML = `${data.isp}`
                map.flyTo([data.location.lat, data.location.lng], 13)
                if (marker !== null) {
                    map.removeLayer(marker)
                }
                marker = L.marker([data.location.lat, data.location.lng])
                marker.addTo(map)
            }
        })

}

function getLocation() {
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("locate-me")) {
            document.querySelector(".info").style.display = "none"
            document.querySelector(".location-info").style.display = "flex"
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {

                    let lat = position.coords.latitude
                    let long = position.coords.longitude

                    fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`)
                        .then(respon => respon.json())
                        .then(data => {
                            latit.innerHTML = data.latitude
                            longit.innerHTML = data.longitude
                            Loca.innerHTML = `${data.city},${data.countryName}`

                            console.log(data)
                            map.flyTo([data.latitude, data.longitude], 13)
                            if (marker !== null) {
                                map.removeLayer(marker)
                            }
                            marker = L.marker([data.latitude, data.longitude])
                            marker.addTo(map)
                        })
                })

            }
        }
    })


}
getLocation()





arrow.addEventListener("click", function () {
    if (input.value == "") {
        alert("Input is Empty")
    } else {
        document.querySelector(".info").style.display = "flex"
        document.querySelector(".location-info").style.display = "none"
        sendReq()
        input.value = ""
    }



})

document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        if (input.value == "") {
            alert("Input is Empty")
        } else {
            document.querySelector(".info").style.display = "flex"
            document.querySelector(".location-info").style.display = "none"
            sendReq()
            input.value = ""
        }
    }


})