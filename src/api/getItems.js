import { ITEMS } from "@/peripherals/Constans";

const getItems = async (page = "", search = "") => {
  try {
    console.log(ITEMS + `?page=${page}&search=${search}`);
    const response = await fetch(ITEMS + `?page=${page}&search=${search}`);

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Propagate the error so it can be handled elsewhere
  }
};

export default getItems;
