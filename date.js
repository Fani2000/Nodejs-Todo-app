//jshint esversion:6

//modules for getting the current date and also the current day

exports.getCurrentDate = () => {

    const options = { weekday: 'long', day: 'numeric', month: 'long' }

    const today = new Date()

    return today.toLocaleDateString("en-US", options)
}

module.exports.getDay = () => {
    const options = { weekday: 'long' }

    const today = new Date()

    return today.toLocaleDateString("en-US", options)
}