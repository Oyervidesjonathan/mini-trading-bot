import axios from "axios"; 

const API = "http://127.0.0.1:8000";

export const getPrice = (symbol) =>
    axios.get(`${API}/prices/${symbol}`);

export const runStrategy = (symbol) =>
    axios.get(`${API}/strategy/${symbol}`);

export const executeTrade = (symbol, quantity) =>
    axios.post(`${API}/trade/${symbol}?quantity=${quantity}`);

export const runBot = (symbol, quantity) =>
    axios.post(`${API}/bot/run/${symbol}?quantity=${quantity}`);

export const getTrades = () =>
    axios.get(`${API}/trades`);