module.exports = {
  entry: {
    testCode: "./react/bin/crawlers/testCode.js",
    myTrips: "./react/bin/myTrips/myTrips.js",
    tripComponent: "./react/bin/trips/TripComponent.js"
  },
  output: {
    path: __dirname + "/public/react",
    filename: "[name].js"
  }
}
