# Ogun State Weather App

A beautiful and responsive weather application for Ogun State, Nigeria, built with Next.js and Tailwind CSS.

## Features

- Real-time weather data for major cities in Ogun State
- Beautiful, responsive UI that works on both mobile and web
- 5-day weather forecast
- Detailed weather information (temperature, humidity, wind, etc.)
- Smooth animations and transitions
- City selector for different locations in Ogun State

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

   You can get a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Axios](https://axios-http.com/) - HTTP client
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data provider

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fogun-weather-app)

## License

This project is licensed under the MIT License.

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
