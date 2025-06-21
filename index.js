   require('dotenv').config();
   const express = require('express');
   const { createClient } = require('@supabase/supabase-js');

   const app = express();
   app.use(express.json());

   const supabaseUrl = process.env.SUPABASE_URL;
   const supabaseKey = process.env.SUPABASE_KEY; // Use service role key
   const supabase = createClient(supabaseUrl, supabaseKey);

   // Get all disasters
   app.get('/disasters', async (req, res) => {
     const { data, error } = await supabase
       .from('disasters')
       .select('*');

     if (error) return res.status(400).json({ error });
     res.status(200).json(data);
   });

   // Create a new disaster
   app.post('/disasters', async (req, res) => {
     const { title, description, date } = req.body;
     const { data, error } = await supabase
       .from('disasters')
       .insert([{ title, description, date }]);

     if (error) return res.status(400).json({ error });
     res.status(201).json(data);
   });

   // Update a disaster
   app.put('/disasters/:id', async (req, res) => {
     const { id } = req.params;
     const { title, description, date } = req.body;
     const { data, error } = await supabase
       .from('disasters')
       .update({ title, description, date })
       .eq('id', id);

     if (error) return res.status(400).json({ error });
     res.status(200).json(data);
   });

   // Delete a disaster
   app.delete('/disasters/:id', async (req, res) => {
     const { id } = req.params;
     const { data, error } = await supabase
       .from('disasters')
       .delete()
       .eq('id', id);

     if (error) return res.status(400).json({ error });
     res.status(204).send();
   });

   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   
      const axios = require('axios');

   // Geocode location name to coordinates
   app.post('/geocode', async (req, res) => {
     const { locationName } = req.body;
     const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName)}&key=${apiKey}`;

     try {
       const response = await axios.get(url);
       const { results } = response.data;

       if (results.length > 0) {
         const { lat, lng } = results[0].geometry.location;
         res.status(200).json({ latitude: lat, longitude: lng });
       } else {
         res.status(404).json({ error: 'Location not found' });
       }
     } catch (error) {
       res.status(500).json({ error: 'Error fetching geocoding data' });
     }
   });
   
      const Twitter = require('twitter-lite');

   // Initialize Twitter client
   const twitterClient = new Twitter({
     consumer_key: 'YOUR_CONSUMER_KEY',
     consumer_secret: 'YOUR_CONSUMER_SECRET',
     access_token_key: 'YOUR_ACCESS_TOKEN',
     access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET',
   });

   // Fetch tweets based on a query
   app.get('/tweets', async (req, res) => {
     const { query } = req.query; // e.g., "disaster"
     try {
       const tweets = await twitterClient.get('search/tweets', { q: query, count: 10 });
       res.status(200).json(tweets.statuses);
     } catch (error) {
       res.status(500).json({ error: 'Error fetching tweets' });
     }
   });
   
      // Get all resources
   app.get('/resources', async (req, res) => {
     const { data, error } = await supabase.from('resources').select('*');
     if (error) return res.status(400).json({ error });
     res.status(200).json(data);
   });

   // Create a new resource
   app.post('/resources', async (req, res) => {
     const { name, type, location, description, contact_info } = req.body;
     const { data, error } = await supabase
       .from('resources')
       .insert([{ name, type, location, description, contact_info }]);

     if (error) return res.status(400).json({ error });
     res.status(201).json(data);
   });
   
      // Fetch official updates (mock example)
   app.get('/official-updates', async (req, res) => {
     // Replace with actual fetching logic
     const updates = [
       { title: "Emergency Declaration", date: "2023-10-01", description: "Emergency declared in the region." },
       { title: "Evacuation Orders", date: "2023-10-02", description: "Evacuation orders issued for affected areas." }
     ];
     res.status(200).json(updates);
   });
   
      // Example endpoint for image verification (mock)
   app.post('/verify-image', async (req, res) => {
     const { imageUrl } = req.body;
     // Replace with actual verification logic
     const isVerified = true; // Mock verification
     res.status(200).json({ verified: isVerified });
   });
   
      const http = require('http');
   const server = http.createServer(app);
   const io = require('socket.io')(server);

   // Listen for connections
   io.on('connection', (socket) => {
     console.log('A user connected');

     // Emit updates to clients
     socket.on('send-update', (update) => {
       io.emit('receive-update', update);
     });

     socket.on('disconnect', () => {
       console.log('User  disconnected');
     });
   });

   // Start the server
   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   
      const morgan = require('morgan');
   app.use(morgan('combined'));
   