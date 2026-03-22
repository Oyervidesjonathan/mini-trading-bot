/**
 * API Client Module
 * 
 * This file centralizes all HTTP requests made to the backend FastAPI service.
 * It uses Axios to communicate with the API and keeps request logic seperate
 * from UI components (seperation of concerns).
 * 
 * This allows the fronend to remain clean and makes it easy to update endpoints
 * or switch enviorments (dev -> production) without changing component logic.
 */
import axios from "axios";

/**
 * Base URL for backend API
 * Currently pointing to local FastAPI server
 */
const API = "http://127.0.0.1:8000";

/**
 * Fetch the latest price for a given stock symbol
 * @param {string} symbol - Stock ticker (e.g, AAPL)
 * @returns {Promise} Axios response containing price data
 */
export const getPrice = (symbol) =>
    axios.get(`${API}/prices/${symbol}`);

/**
 * Run trading startegy logic for a given symbol
 * Returns decision (BUY / SELL / HOLD) based on backend logic
 * @param {string} symbol
 */
export const runStrategy = (symbol) =>
    axios.get(`${API}/strategy/${symbol}`);

/**
 * Execute a trade and store it in the database
 * @param {string} symbol
 * @param {number} quantity
 */
export const executeTrade = (symbol, quantity) =>
    axios.post(`${API}/trade/${symbol}?quantity=${quantity}`);

/**
 * Run full trading bot workflow:
 * strategy -> decision -> execution 
 * @param {string} symbol
 * @param {number} quantity
 */
export const runBot = (symbol, quantity) =>
    axios.post(`${API}/bot/run/${symbol}?quantity=${quantity}`);

/**
 * Retrive all executed trades from the database
 * Used for displaying trade history
 */
export const getTrades = () =>
    axios.get(`${API}/trades`);

export const getAccount = (userId) =>
  axios.get(`${API}/account/${userId}`);