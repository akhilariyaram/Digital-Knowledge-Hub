import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};
const MyComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const apiKey = "8ffe8bdd90834241ac3220220230907";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch weather data.");
            }

            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
            setErrorMessage("");
          } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
            setWeatherData(null);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [apiKey]);

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!city) {
      setErrorMessage("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const data = await response.json();
      setWeatherData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setWeatherData(null);
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-primary min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg p-8">
        <form onSubmit={handleLocationSearch} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-2 border-gray-300 rounded-md py-2 text-center"
            placeholder="Enter a city name"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-6"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {weatherData && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Weather Forecast for {weatherData.location.name}
            </h2>
            <Slider {...settings}>
              {weatherData.forecast.forecastday.map((day, index) => (
                <div key={day.date} className="mb-4 text-center">
                  <p className="font-bold">Day {index + 1}</p>
                  <p>Date: {day.date}</p>
                  <p>Condition: {day.day.condition.text}</p>
                  <p>Max Temperature: {day.day.maxtemp_c}°C</p>
                  <p>Min Temperature: {day.day.mintemp_c}°C</p>
                  <p>Sunrise: {day.astro.sunrise}</p>
                  <p>Sunset: {day.astro.sunset}</p>
                  <p>Humidity: {day.day.avghumidity}%</p>
                  <hr className="my-4" />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
      <Footer />
    </>
  );
};

export default MyComponent;
