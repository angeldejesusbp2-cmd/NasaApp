// Configuración de la API de NASA
const API_KEY = 'AN0XyshYyLrSaQVPlnAqgrTRs1nif9MtVdxIGyFG'; 
const BASE_URL = 'https://api.nasa.gov';

export const NasaAPI = {
  // Picture of the Day
  async getPictureOfDay() {
    try {
      const response = await fetch(
        `${BASE_URL}/planetary/apod?api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Error fetching picture of day');
      return await response.json();
    } catch (error) {
      console.error('getPictureOfDay error:', error);
      throw error;
    }
  },

  // Buscar imágenes y videos
  async searchAssets(query: string, page = 1) {
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&page=${page}`
      );
      if (!response.ok) throw new Error('Error searching assets');
      return await response.json();
    } catch (error) {
      console.error('searchAssets error:', error);
      throw error;
    }
  },

  // Datos de Earth
  async getEarthImagery(lon: number, lat: number, dim = 0.15) {
    try {
      const response = await fetch(
        `${BASE_URL}/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=${dim}&api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Error fetching Earth imagery');
      return response.url;
    } catch (error) {
      console.error('getEarthImagery error:', error);
      throw error;
    }
  },

  // EPIC - Earth Imagery
  async getEpicImages(date?: string) {
    try {
      const url = date
        ? `${BASE_URL}/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
        : `${BASE_URL}/EPIC/api/natural?api_key=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error fetching EPIC images');
      return await response.json();
    } catch (error) {
      console.error('getEpicImages error:', error);
      throw error;
    }
  },

  // Mars Rover Photos
  async getMarsRoverPhotos(rover = 'curiosity', sol = 0, camera?: string) {
    try {
      const cameraParam = camera ? `&camera=${camera}` : '';
      const response = await fetch(
        `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${cameraParam}&api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Error fetching Mars rover photos');
      return await response.json();
    } catch (error) {
      console.error('getMarsRoverPhotos error:', error);
      throw error;
    }
  },

  // Asteroides cercanos
  async getNearEarthObjects(startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Error fetching NEO data');
      return await response.json();
    } catch (error) {
      console.error('getNearEarthObjects error:', error);
      throw error;
    }
  },

  // Datos técnicos de asteroides
  async getAsteroidData(asteroidId: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`
      );
      if (!response.ok) throw new Error('Error fetching asteroid data');
      return await response.json();
    } catch (error) {
      console.error('getAsteroidData error:', error);
      throw error;
    }
  },
};
