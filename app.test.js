   const request = require('supertest');
   const app = require('./index'); // Adjust the path as necessary

   describe('GET /disasters', () => {
     it('should return all disasters', async () => {
       const res = await request(app).get('/disasters');
       expect(res.statusCode).toEqual(200);
       expect(res.body).toBeInstanceOf(Array);
     });
   });
   