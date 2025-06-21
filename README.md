# 🌍 Disaster Response Coordination Platform

A full-stack MERN disaster response platform designed to help authorities and civilians manage and respond to natural disasters in real-time. This project uses Google Gemini AI, Supabase geospatial queries, and mock social media data to provide a robust backend-driven system for disaster data aggregation and resource mapping.

## 🚀 Features

- 🌪️ **Disaster Management**: CRUD APIs for disasters with audit trails.
- 📍 **Location Extraction**: Uses Google Gemini to extract locations from text and converts them to lat/lng with OpenStreetMap.
- 🧭 **Geospatial Resource Lookup**: Supabase geospatial queries to find nearby shelters, resources, or affected areas.
- 🔁 **Real-Time Updates**: WebSocket updates for disaster reports and resources.
- 📷 **Image Verification**: Uses Gemini to check disaster image authenticity.
- 🐦 **Mock Social Media Feed**: Simulates real-time reports from Twitter-like sources.
- 🧠 **AI + Caching**: All API responses cached in Supabase with TTL to optimize performance and avoid rate limits.

## 🛠️ Tech Stack

- **Frontend**: HTML + Vanilla JavaScript
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: Supabase (PostgreSQL with Geospatial Extensions)
- **External APIs**: Google Gemini, OpenStreetMap (Nominatim), Cheerio (for Browse Page scraping)
- **Hosting**: 
  - Backend: Render
  - Frontend: Vercel

## 📦 Setup Instructions

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/disaster-response-coordination-platform.git

