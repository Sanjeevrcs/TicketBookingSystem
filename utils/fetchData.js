import { Booking } from '../models/BookingModel.js';
import { Trip } from '../models/TripModel.js';
import { Seat } from '../models/SeatModel.js';
import { Bus } from '../models/BusModel.js';
import { Route } from '../models/RouteModel.js';
import { Location } from '../models/LocationModel.js';

export const listAll = async (req, res) => {
    try {
        const { modelName } = req.params;

        let modelData;

        switch (modelName) {
            case 'bus':
                modelData = await Bus.find({});
                break;
            case 'location':
                modelData = await Location.find({});
                break;
            case 'booking':
                modelData = await Booking.find({});
                break;
            case 'trip':
                modelData = await Trip.find({});
                break;
            case 'seat':
                modelData = await Seat.find({});
                break;
            case 'route':
                modelData = await Route.find({});
                break;
            default:
                return res.status(404).send({ message: 'Model not found' });
        }

        return res.status(200).send({ [modelName]: modelData });
    } catch (error) {
        console.error('Error listing data:', error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
