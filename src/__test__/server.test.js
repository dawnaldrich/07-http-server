'use strict';

const server = require('//lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('GET /time', () => {
    it('should response with a status 200', () => {
      return superagent.get(':5000/time')
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('date');
        });
    });
  });

  describe('GET /cowsayPage', () => {
    const mockCow = cowsay.say({ test: 'Hello World' });
    const mockHtml = `<section><h3><a href="/time"/>Click here ofr current time</a></h3><pre>${mockCow}</pre></section>`;
    it('should respondwith status 200 and return cow HTML', () => {
      return superagent.get(':5000/cowsayPage')
        .query({ test: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHtml);
        });
    });
  });

  describe('POST /echo', () => {
    it('should return status 200 for successful post', () => {
      return superagent.post(':5000/echo')
        .send({ name: 'dawn' })
        .then((res) => {
          expect(res.body.name).toEqual('dawn');
          expect(res.status).toEqual(200);
        });
    });
  });

  // describe('INVALID request to the API', () => {
  //   describe('GET /cowsayPage', () => {
  //     it('should err out with 400 status code for not sending text in query', () => {
  //       return superagent.get('5000/cowsayPage')
  //         .query({ })
  //         .then(() = {})
  //         .catch((err) => {
  //           expect(err.status).toEqual(400);
  //           expect(err).toBeTruthy();
  //         });
  //     });
  //   });
  // });
});

