import { coordinatorModel } from "../models/coordinatorModel.js";
import { culturalTraditionModel } from "../models/culturalTraditionModel.js";
import { eventModel } from "../models/eventModel.js";
import { foodRecommendationModel } from "../models/foodRecommendationModel.js";
import { inspirationModel } from "../models/inspirationsModel.js";
import { themeModel } from "../models/themeModel.js";
import { userWeddingModel } from "../models/userWeddingModel.js";
import { vendorModel } from "../models/vendorModel.js";

export const getAllEvent = async (req, res) => {
  try {
    let expandedEventData = [];
    //get all events based on user_id and lean() to return json
    const eventList = await eventModel.find({ user_id: req.user.id }).lean();

    for (const event of eventList) {
      let newEvent = { ...event };
      //return coordinator details by coordinator_id
      const coordinatorDetails = await coordinatorModel
        .findById(event.coordinator_id)
        .lean();
      newEvent.coordinatorDetails = coordinatorDetails;

      //return theme details by theme_id
      const themeDetails = await themeModel.findById(event.theme_id).lean();
      newEvent.themeDetails = themeDetails;

      //return vendors id to expanded data data
      if (newEvent.vendors.length > 0) {
        //get all vendor data from DB
        const allVendorDetails = await vendorModel.find({}).lean();

        //convert vendors array to array of strings of vendor ids
        const vendorIds = newEvent.vendors.map((vendor) =>
          vendor.vendor_id.toString()
        );
        //check all vendors with the vendor saved in the event and return the details
        const matchingVendors = allVendorDetails.filter((vendor) =>
          vendorIds.includes(vendor._id.toString())
        );
        //add the expanded vendor data to newEvent variable
        newEvent.vendors = matchingVendors;
      }
      expandedEventData = [...expandedEventData, newEvent];
    }
    //return the expanded event data
    res.json(expandedEventData);
  } catch (error) {
    res.status(400).json({ message: "event not found !" });
  }
};

export const createEvent = async (req, res) => {
  try {
    let wedding_id = "";
    let food_recommendations = [];
    let cultural_traditions = [];
    let inspirations = [];

    const user_id = req.user.id;
    const {
      coordinator_id,
      theme_id,
      location,
      event_date,
      event_type,
      guest_count,
      bride_first_name,
      bride_last_name,
      bride_email,
      bride_mobile,
      bride_nationality,
      bride_cultural_origin,
      bride_religion,
      bride_preferred_language,
      groom_first_name,
      groom_last_name,
      groom_email,
      groom_mobile,
      groom_nationality,
      groom_cultural_origin,
      groom_religion,
      groom_preferred_language,
      vendors,
    } = req.body;

    if (
      !user_id ||
      !coordinator_id ||
      !location ||
      !event_date ||
      !event_type ||
      !guest_count
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    //if event type = wedding create wedding data
    if (
      event_type === "Wedding" &&
      (!bride_first_name ||
        !bride_last_name ||
        !bride_email ||
        !bride_mobile ||
        !bride_nationality ||
        !bride_cultural_origin ||
        !bride_religion ||
        !bride_preferred_language ||
        !groom_first_name ||
        !groom_last_name ||
        !groom_email ||
        !groom_mobile ||
        !groom_nationality ||
        !groom_cultural_origin ||
        !groom_religion ||
        groom_preferred_language)
    ) {
      const wedding = await userWeddingModel.create({
        user_id,
        bride_first_name,
        bride_last_name,
        bride_email,
        bride_mobile,
        bride_nationality,
        bride_cultural_origin,
        bride_religion,
        bride_preferred_language,
        groom_first_name,
        groom_last_name,
        groom_email,
        groom_mobile,
        groom_nationality,
        groom_cultural_origin,
        groom_religion,
        groom_preferred_language,
      });
      wedding_id = wedding._id;

      //return food_recommendations based on bride and groom cultural origin
      food_recommendations = await foodRecommendationModel.find({
        cultural_origin: {
          $in: [bride_cultural_origin, groom_cultural_origin],
        },
      });
      //return cultural_traditions based on bride and groom cultural origin
      cultural_traditions = await culturalTraditionModel.find({
        cultural_origin: {
          $in: [bride_cultural_origin, groom_cultural_origin],
        },
        religion: {
          $in: [bride_religion, groom_religion],
        },
      });
      // return all inspirations
      inspirations = await inspirationModel.find({});
    }

    let eventData = {
      user_id,
      coordinator_id,
      theme_id,
      location,
      event_date,
      event_type,
      guest_count,
      vendors,
    };

    //add wedding_id if there is wedding_id
    if (wedding_id) {
      eventData.wedding_id = wedding_id;
    }

    //crete event in DB
    await eventModel.create(eventData);

    //return recommendations when event is created successfully
    res.status(201).json({
      message: "Event created successfully",
      food_recommendations,
      cultural_traditions,
      inspirations,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
