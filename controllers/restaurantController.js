const Restaurant = require('../models/Restaurant.js');

const createRestaurant = async (req, res) => {

    const  newRestaurant = new Restaurant(req.body)

    try {

        await newRestaurant.save();

        res.status(201).json({message: 'Restaurant created successfully'});

    } catch (error) {

        res.status(500).json({status:false, message: "Error creating restaurant", error: error.message})

    }


}

const serviceAvailability = async (req, res) => {

    const restaurantId = req.params.id; // get the restaurant id from the request params

    try {

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({status: false, message: 'Restaurant not found'});
        }

        restaurant.isAvailable = !restaurant.isAvailable;

        await restaurant.save();

        res.status(200).json({status: true, message: 'Service availability updated successfully'});


    } catch {

        res.status(500).json({status: false, message: 'Error updating service availability'});

    }

}

deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id;

    try {

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({status: false, message: 'Restaurant not found'});
        }

        await Restaurant.findByIdAndDelete(restaurantId);

        res.status(200).json({status: true, message: 'Restaurant deleted successfully'});


    } catch (error) {

        res.status(500).json({status: false, message: 'Error deleting restaurant', error: error.message});

    }



}

module.exports = {createRestaurant, serviceAvailability, deleteRestaurant};


