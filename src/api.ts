// API Configuration
const API_BASE = import.meta.env.VITE_API_BASE || "https://abdo238923.pythonanywhere.com/api";

// Fetch Properties
export async function fetchProperties() {
  try {
    const res = await fetch(`${API_BASE}/properties/`);
    if (!res.ok) throw new Error("Failed to fetch properties");
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Fetch Single Property
export async function fetchProperty(id: string) {
  try {
    const res = await fetch(`${API_BASE}/properties/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch property");
    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Fetch Areas
export async function fetchAreas() {
  try {
    const res = await fetch(`${API_BASE}/areas/`);
    if (!res.ok) throw new Error("Failed to fetch areas");
    return res.json();
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
}

// Transform Backend Data to Frontend Format
export function transformPropertyData(backendProperty: any) {
  return {
    id: backendProperty.id,
    name: backendProperty.name,
    nameEn: backendProperty.name_en || "",
    area: backendProperty.area?.name || "Not specified",
    address: backendProperty.address,
    price: parseInt(backendProperty.price),
    rooms: backendProperty.rooms,
    bathrooms: backendProperty.bathrooms,
    size: backendProperty.size,
    floor: backendProperty.floor,
    furnished: backendProperty.furnished,
    type: backendProperty.type,
    typeEn: backendProperty.type_en || "",
    images: backendProperty.images?.map((img: any) => img.image_url) || [],
    description: backendProperty.description,
    descriptionEn: backendProperty.description_en || "",
    contact: backendProperty.contact,
    featured: backendProperty.featured || false,
  };
}

// Fetch Properties with Transformation
export async function fetchPropertiesTransformed() {
  const properties = await fetchProperties();
  return properties.map(transformPropertyData);
}
