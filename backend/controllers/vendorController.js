import { vendorModel } from "../models/vendorModel.js";

export const getAllVendor = async (req, res) => {
  try {
    const vendorList = await vendorModel.find({});

    const processedData = [];

    // Group vendors by vendor_type
    vendorList.forEach((vendor) => {
      const existingEntry = processedData.find(
        (entry) => entry.vendor_type === vendor.vendor_type
      );

      if (existingEntry) {
        existingEntry.vendors.push(vendor);
      } else {
        processedData.push({
          vendor_type: vendor.vendor_type,
          vendors: [vendor],
        });
      }
    });
    res.json(processedData);
  } catch (error) {
    res.status(400).json({ message: "vendor not found !" });
  }
};
