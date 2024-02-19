const fs = require('fs')



const hellocallback = function(coordinates) {
    console.log(coordinates)
}

const parseGeoJSON = function(fileDirectory, callback) {

    var results = []

    fs.readFile(fileDirectory, 'utf8', (err, data) => {

        if (err) {
            console.error(err)
            return "null"
        }

        var polygons = []

        var features = JSON.parse(data).features
        var numberPolygons = features.length
        var polygonIndices = 0;
        var singlePolygonIndex = 0
        
        for (var nthPolygon = 0; nthPolygon < numberPolygons; nthPolygon++) {

            var coordinates = features[nthPolygon].geometry.coordinates
            var latitudes = []
            var longitudes = []

            if (features[nthPolygon].geometry.type == 'MultiPolygon') {
                
                // MultiPolygon
                for (var polygonIndex = 0; polygonIndex = coordinates.length; polygonIndex++) { for(var coordIndex = 0; coordIndex < coordinates[polygonIndex].length; coordIndex++)
                    
                    multiLatitudes  = []
                    multiLongitudes = []

                    for (var geographicPoint = 0; geographicPoint < coordinates[polygonIndex][coordIndex].length; geographicPoint++) {

                        multiLatitudes[geographicPoint]  = parseFloat(coordinates[polygonIndex][coordIndex][geographicPoint][1])
                        multiLongitudes[geographicPoint] = parseFloat(coordinates[polygonIndex][coordIndex][geographicPoint][0])
                    }

                    polygons[polygonIndices] = [multiLatitudes, multiLongitudes]
                    polygonIndices++
                }
            }
            else if (features[nthPolygon].geometry.type == 'Polygon') {
                
                for (var i = 0; i < coordinates[0].length; i++) {
                    latitudes[i]  = parseFloat(coordinates[0][i][1])
                    longitudes[i] = parseFloat(coordinates[0][i][0])
                }
                polygons[singlePolygonIndex] = [latitudes, longitudes]
                singlePolygonIndex++
            }
        }
        callback(polygons)
    })
}

parseGeoJSON('./ukraine_geojson/UA_FULL_Ukraine.geojson', hellocallback)
