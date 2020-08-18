function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function updateMap() {
    fetch("./cntry.json")
        .then(response => {
            return response.json()
        })
        .then((rsp) => {
            // console.log(rsp.ref_country_codes[0].latitude);
            // console.log(rsp.ref_country_codes[0].longitude);
            console.log(rsp.ref_country_codes.length);
            rsp.ref_country_codes.sort(GetSortOrder("deaths"));
            // array.sort(GetSortOrder("EmployeeName"))
            console.log(rsp.ref_country_codes)
            for (index = 0; index < rsp.ref_country_codes.length; index++) {
                // rsp.data.forEach(element => {
                console.log(rsp.ref_country_codes[index].deaths, rsp.ref_country_codes[index].longitude, rsp.ref_country_codes[index].latitude);
                let lat = rsp.ref_country_codes[index].latitude;
                let long = rsp.ref_country_codes[index].longitude;
                //  console.log(`${index+1}:`, lat);
                //  console.log(`${index+1}:`, long);

                cases = rsp.ref_country_codes[index].deaths;
                //  console.log("case :"+cases);

                if (cases >= 5000) {
                    color = "#b30000";
                }

                else if (cases >= 1000 && cases < 5000) {
                    color = "red";
                }

                else if (cases >= 500 && cases < 1000) {
                    color = "orange";
                }

                else if (cases > 100 && cases < 500) {
                    color = '#ffff4d';
                }

                else if (cases < 100)
                    color = "rgb(102, 204, 0)";

                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                    // visibility:0.1
                })
                    .setLngLat([long, lat])
                    .addTo(map);
            }
        })

}
updateMap();