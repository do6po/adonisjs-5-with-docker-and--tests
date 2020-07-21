import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export default {
  test,
  JSDOM,
  request: () => {
    return supertest(BASE_URL)
  }
}
