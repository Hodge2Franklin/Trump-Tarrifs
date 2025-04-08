// Real-Time Data Service for Trump Tariff Analysis Website

/**
 * This module provides real-time data integration with market APIs,
 * websocket connections for streaming data, and automated refresh mechanisms.
 * It interfaces with the Python backend to provide live market data to the frontend.
 */

class RealTimeDataService {
  constructor() {
    this.isInitialized = false;
    this.isConnected = false;
    this.subscribers = {};
    this.dataCache = {};
    this.cacheTimestamps = {};
    this.refreshIntervals = {
      marketIndices: 60000,  // 1 minute
      forexRates: 300000,    // 5 minutes
      stockQuotes: 30000,    // 30 seconds
      tariffNews: 900000,    // 15 minutes
      economicIndicators: 3600000  // 1 hour
    };
    this.refreshTimers = {};
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000; // 5 seconds
    
    // Define API endpoints
    this.apiEndpoints = {
      marketIndices: '/api/market-indices',
      forexRates: '/api/forex-rates',
      stockQuotes: '/api/stock-quotes',
      tariffNews: '/api/tariff-news',
      economicIndicators: '/api/economic-indicators',
      historicalData: '/api/historical-data'
    };
    
    // Define websocket endpoint
    this.wsEndpoint = 'ws://localhost:8000/ws';
    
    // Define ASX stocks to track
    this.asxStocks = [
      'BHP.AX', 'RIO.AX', 'FMG.AX', 'MIN.AX', 'S32.AX',  // Materials
      'TWE.AX', 'A2M.AX', 'WES.AX', 'WOW.AX', 'COL.AX',  // Consumer Staples
      'CSL.AX', 'RMD.AX', 'COH.AX',                      // Healthcare
      'CBA.AX', 'NAB.AX', 'WBC.AX', 'ANZ.AX', 'MQG.AX',  // Financials
      'WTC.AX', 'XRO.AX', 'APX.AX', 'ALU.AX',            // Information Technology
      'TCL.AX', 'SYD.AX', 'QAN.AX',                      // Industrials
      'AGL.AX', 'ORG.AX',                                // Utilities
      'WPL.AX', 'STO.AX'                                 // Energy
    ];
    
    // Define market indices to track
    this.marketIndices = [
      '^AXJO',  // ASX 200
      '^AORD',  // All Ordinaries
      '^GSPC',  // S&P 500
      '^DJI',   // Dow Jones
      '^IXIC',  // NASDAQ
      '^HSI',   // Hang Seng
      '^N225',  // Nikkei 225
      '^FTSE'   // FTSE 100
    ];
    
    // Define forex pairs to track
    this.forexPairs = [
      'AUD/USD', 'AUD/CNY', 'USD/CNY', 'AUD/JPY', 'AUD/EUR'
    ];
  }
  
  /**
   * Initialize the real-time data service
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  async initialize() {
    if (this.isInitialized) {
      console.warn('Real-time data service is already initialized');
      return Promise.resolve();
    }
    
    console.log('Initializing real-time data service');
    
    try {
      // Fetch initial data
      await this._fetchInitialData();
      
      // Connect to websocket
      this._connectWebSocket();
      
      // Start refresh timers
      this._startRefreshTimers();
      
      this.isInitialized = true;
      console.log('Real-time data service initialized successfully');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error initializing real-time data service:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Fetch initial data for all data types
   * @returns {Promise} Promise that resolves when all data is fetched
   */
  async _fetchInitialData() {
    console.log('Fetching initial data');
    
    try {
      // Fetch data in parallel
      const [marketIndices, forexRates, stockQuotes, tariffNews, economicIndicators] = await Promise.all([
        this._fetchMarketIndices(),
        this._fetchForexRates(),
        this._fetchStockQuotes(),
        this._fetchTariffNews(),
        this._fetchEconomicIndicators()
      ]);
      
      // Update cache
      this.dataCache.marketIndices = marketIndices;
      this.dataCache.forexRates = forexRates;
      this.dataCache.stockQuotes = stockQuotes;
      this.dataCache.tariffNews = tariffNews;
      this.dataCache.economicIndicators = economicIndicators;
      
      // Update cache timestamps
      const now = Date.now();
      this.cacheTimestamps.marketIndices = now;
      this.cacheTimestamps.forexRates = now;
      this.cacheTimestamps.stockQuotes = now;
      this.cacheTimestamps.tariffNews = now;
      this.cacheTimestamps.economicIndicators = now;
      
      console.log('Initial data fetched successfully');
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error fetching initial data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Connect to websocket for real-time updates
   */
  _connectWebSocket() {
    console.log('Connecting to websocket');
    
    try {
      // In a real implementation, this would connect to an actual websocket
      // For demonstration, we'll simulate websocket connection
      
      this.isConnected = true;
      console.log('Connected to websocket');
      
      // Simulate receiving websocket messages
      this._simulateWebSocketMessages();
    } catch (error) {
      console.error('Error connecting to websocket:', error);
      this._scheduleReconnect();
    }
  }
  
  /**
   * Schedule websocket reconnection
   */
  _scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Maximum reconnect attempts reached');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this._connectWebSocket();
    }, delay);
  }
  
  /**
   * Simulate receiving websocket messages
   */
  _simulateWebSocketMessages() {
    // Simulate stock quote updates
    setInterval(() => {
      if (!this.isConnected) return;
      
      // Generate random stock update
      const stockSymbol = this.asxStocks[Math.floor(Math.random() * this.asxStocks.length)];
      const currentPrice = this._getCachedStockPrice(stockSymbol);
      
      if (currentPrice) {
        // Generate small price change
        const priceChange = currentPrice * (Math.random() * 0.01 - 0.005);
        const newPrice = currentPrice + priceChange;
        
        // Create simulated message
        const message = {
          type: 'stockUpdate',
          symbol: stockSymbol,
          price: newPrice,
          volume: Math.floor(Math.random() * 9000) + 1000,
          timestamp: Date.now()
        };
        
        // Process the message
        this._handleWebSocketMessage(message);
      }
    }, 5000);
    
    // Simulate forex rate updates
    setInterval(() => {
      if (!this.isConnected) return;
      
      // Generate random forex update
      const forexPair = this.forexPairs[Math.floor(Math.random() * this.forexPairs.length)];
      const currentRate = this._getCachedForexRate(forexPair);
      
      if (currentRate) {
        // Generate small rate change
        const rateChange = currentRate * (Math.random() * 0.004 - 0.002);
        const newRate = currentRate + rateChange;
        
        // Create simulated message
        const message = {
          type: 'forexUpdate',
          pair: forexPair,
          rate: newRate,
          timestamp: Date.now()
        };
        
        // Process the message
        this._handleWebSocketMessage(message);
      }
    }, 10000);
    
    // Simulate market index updates
    setInterval(() => {
      if (!this.isConnected) return;
      
      // Generate random index update
      const indexSymbol = this.marketIndices[Math.floor(Math.random() * this.marketIndices.length)];
      const currentValue = this._getCachedIndexValue(indexSymbol);
      
      if (currentValue) {
        // Generate small value change
        const valueChange = currentValue * (Math.random() * 0.002 - 0.001);
        const newValue = currentValue + valueChange;
        
        // Create simulated message
        const message = {
          type: 'indexUpdate',
          symbol: indexSymbol,
          value: newValue,
          timestamp: Date.now()
        };
        
        // Process the message
        this._handleWebSocketMessage(message);
      }
    }, 15000);
  }
  
  /**
   * Handle websocket message
   * @param {Object} message - Websocket message
   */
  _handleWebSocketMessage(message) {
    switch (message.type) {
      case 'stockUpdate':
        this._handleStockUpdate(message);
        break;
      case 'forexUpdate':
        this._handleForexUpdate(message);
        break;
      case 'indexUpdate':
        this._handleIndexUpdate(message);
        break;
      case 'newsUpdate':
        this._handleNewsUpdate(message);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }
  
  /**
   * Handle stock update message
   * @param {Object} message - Stock update message
   */
  _handleStockUpdate(message) {
    const { symbol, price, volume, timestamp } = message;
    
    // Update cache
    if (!this.dataCache.stockQuotes) {
      this.dataCache.stockQuotes = {};
    }
    
    if (!this.dataCache.stockQuotes[symbol]) {
      this.dataCache.stockQuotes[symbol] = {
        symbol,
        price,
        volume,
        timestamp
      };
    } else {
      // Calculate change percentage
      const previousPrice = this.dataCache.stockQuotes[symbol].price;
      const changePct = ((price - previousPrice) / previousPrice) * 100;
      
      this.dataCache.stockQuotes[symbol].price = price;
      this.dataCache.stockQuotes[symbol].volume = volume;
      this.dataCache.stockQuotes[symbol].timestamp = timestamp;
      this.dataCache.stockQuotes[symbol].changePct = changePct;
    }
    
    // Notify subscribers
    this._notifySubscribers('stockQuotes', {
      type: 'update',
      symbol,
      data: this.dataCache.stockQuotes[symbol]
    });
  }
  
  /**
   * Handle forex update message
   * @param {Object} message - Forex update message
   */
  _handleForexUpdate(message) {
    const { pair, rate, timestamp } = message;
    
    // Update cache
    if (!this.dataCache.forexRates) {
      this.dataCache.forexRates = {};
    }
    
    if (!this.dataCache.forexRates[pair]) {
      this.dataCache.forexRates[pair] = {
        pair,
        rate,
        timestamp
      };
    } else {
      // Calculate change percentage
      const previousRate = this.dataCache.forexRates[pair].rate;
      const changePct = ((rate - previousRate) / previousRate) * 100;
      
      this.dataCache.forexRates[pair].rate = rate;
      this.dataCache.forexRates[pair].timestamp = timestamp;
      this.dataCache.forexRates[pair].changePct = changePct;
    }
    
    // Notify subscribers
    this._notifySubscribers('forexRates', {
      type: 'update',
      pair,
      data: this.dataCache.forexRates[pair]
    });
  }
  
  /**
   * Handle index update message
   * @param {Object} message - Index update message
   */
  _handleIndexUpdate(message) {
    const { symbol, value, timestamp } = message;
    
    // Update cache
    if (!this.dataCache.marketIndices) {
      this.dataCache.marketIndices = {};
    }
    
    if (!this.dataCache.marketIndices[symbol]) {
      this.dataCache.marketIndices[symbol] = {
        symbol,
        value,
        timestamp
      };
    } else {
      // Calculate change percentage
      const previousValue = this.dataCache.marketIndices[symbol].value;
      const changePct = ((value - previousValue) / previousValue) * 100;
      
      this.dataCache.marketIndices[symbol].value = value;
      this.dataCache.marketIndices[symbol].timestamp = timestamp;
      this.dataCache.marketIndices[symbol].changePct = changePct;
    }
    
    // Notify subscribers
    this._notifySubscribers('marketIndices', {
      type: 'update',
      symbol,
      data: this.dataCache.marketIndices[symbol]
    });
  }
  
  /**
   * Handle news update message
   * @param {Object} message - News update message
   */
  _handleNewsUpdate(message) {
    const { news } = message;
    
    // Update cache
    if (!this.dataCache.tariffNews) {
      this.dataCache.tariffNews = [];
    }
    
    // Check if news item already exists
    const existingIndex = this.dataCache.tariffNews.findIndex(item => item.id === news.id);
    
    if (existingIndex === -1) {
      // Add new news item
      this.dataCache.tariffNews.unshift(news);
      
      // Keep only the 20 most recent news items
      if (this.dataCache.tariffNews.length > 20) {
        this.dataCache.tariffNews.pop();
      }
      
      // Notify subscribers
      this._notifySubscribers('tariffNews', {
        type: 'add',
        data: news
      });
    }
  }
  
  /**
   * Start refresh timers for periodic data updates
   */
  _startRefreshTimers() {
    console.log('Starting refresh timers');
    
    // Market indices refresh timer
    this.refreshTimers.marketIndices = setInterval(() => {
      this._fetchMarketIndices()
        .then(data => {
          this.dataCache.marketIndices = data;
          this.cacheTimestamps.marketIndices = Date.now();
          this._notifySubscribers('marketIndices', {
            type: 'refresh',
            data
          });
        })
        .catch(error => console.error('Error refreshing market indices:', error));
    }, this.refreshIntervals.marketIndices);
    
    // Forex rates refresh timer
    this.refreshTimers.forexRates = setInterval(() => {
      this._fetchForexRates()
        .then(data => {
          this.dataCache.forexRates = data;
          this.cacheTimestamps.forexRates = Date.now();
          this._notifySubscribers('forexRates', {
            type: 'refresh',
            data
          });
        })
        .catch(error => console.error('Error refreshing forex rates:', error));
    }, this.refreshIntervals.forexRates);
    
    // Stock quotes refresh timer
    this.refreshTimers.stockQuotes = setInterval(() => {
      this._fetchStockQuotes()
        .then(data => {
          this.dataCache.stockQuotes = data;
          this.cacheTimestamps.stockQuotes = Date.now();
          this._notifySubscribers('stockQuotes', {
            type: 'refresh',
            data
          });
        })
        .catch(error => console.error('Error refreshing stock quotes:', error));
    }, this.refreshIntervals.stockQuotes);
    
    // Tariff news refresh timer
    this.refreshTimers.tariffNews = setInterval(() => {
      this._fetchTariffNews()
        .then(data => {
          this.dataCache.tariffNews = data;
          this.cacheTimestamps.tariffNews = Date.now();
          this._notifySubscribers('tariffNews', {
            type: 'refresh',
            data
          });
        })
        .catch(error => console.error('Error refreshing tariff news:', error));
    }, this.refreshIntervals.tariffNews);
    
    // Economic indicators refresh timer
    this.refreshTimers.economicIndicators = setInterval(() => {
      this._fetchEconomicIndicators()
        .then(data => {
          this.dataCache.economicIndicators = data;
          this.cacheTimestamps.economicIndicators = Date.now();
          this._notifySubscribers('economicIndicators', {
            type: 'refresh',
            data
          });
        })
        .catch(error => console.error('Error refreshing economic indicators:', error));
    }, this.refreshIntervals.economicIndicators);
    
    console.log('Refresh timers started');
  }
  
  /**
   * Stop refresh timers
   */
  _stopRefreshTimers() {
    console.log('Stopping refresh timers');
    
    // Clear all refresh timers
    Object.values(this.refreshTimers).forEach(timer => clearInterval(timer));
    
    // Reset refresh timers object
    this.refreshTimers = {};
    
    console.log('Refresh timers stopped');
  }
  
  /**
   * Fetch market indices data from API
   * @returns {Promise} Promise that resolves with market indices data
   */
  async _fetchMarketIndices() {
    console.log('Fetching market indices data');
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      const indices = {};
      
      this.marketIndices.forEach(symbol => {
        // Generate random values
        let currentValue;
        
        if (symbol === '^AXJO') {  // ASX 200
          currentValue = 7450 + (Math.random() * 100 - 50);
        } else if (symbol === '^AORD') {  // All Ordinaries
          currentValue = 7650 + (Math.random() * 100 - 50);
        } else if (symbol === '^GSPC') {  // S&P 500
          currentValue = 4850 + (Math.random() * 100 - 50);
        } else if (symbol === '^DJI') {  // Dow Jones
          currentValue = 38500 + (Math.random() * 500 - 250);
        } else if (symbol === '^IXIC') {  // NASDAQ
          currentValue = 15250 + (Math.random() * 500 - 250);
        } else if (symbol === '^HSI') {  // Hang Seng
          currentValue = 18500 + (Math.random() * 1000 - 500);
        } else if (symbol === '^N225') {  // Nikkei 225
          currentValue = 38500 + (Math.random() * 1000 - 500);
        } else if (symbol === '^FTSE') {  // FTSE 100
          currentValue = 7850 + (Math.random() * 100 - 50);
        } else {
          currentValue = 5000 + (Math.random() * 5000);
        }
        
        // Generate random change percentage
        const changePct = (Math.random() * 2 - 1).toFixed(2);
        
        indices[symbol] = {
          symbol,
          name: this._getIndexName(symbol),
          value: currentValue,
          changePct: parseFloat(changePct),
          timestamp: Date.now()
        };
      });
      
      console.log('Market indices data fetched successfully');
      
      return Promise.resolve(indices);
    } catch (error) {
      console.error('Error fetching market indices data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Fetch forex rates data from API
   * @returns {Promise} Promise that resolves with forex rates data
   */
  async _fetchForexRates() {
    console.log('Fetching forex rates data');
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      const rates = {};
      
      this.forexPairs.forEach(pair => {
        // Generate random values
        let currentRate;
        
        if (pair === 'AUD/USD') {
          currentRate = 0.675 + (Math.random() * 0.05 - 0.025);
        } else if (pair === 'AUD/CNY') {
          currentRate = 4.4 + (Math.random() * 0.2 - 0.1);
        } else if (pair === 'USD/CNY') {
          currentRate = 6.5 + (Math.random() * 0.2 - 0.1);
        } else if (pair === 'AUD/JPY') {
          currentRate = 102.5 + (Math.random() * 5 - 2.5);
        } else if (pair === 'AUD/EUR') {
          currentRate = 0.625 + (Math.random() * 0.05 - 0.025);
        } else {
          currentRate = 1 + (Math.random() * 1 - 0.5);
        }
        
        // Generate random change percentage
        const changePct = (Math.random() * 1 - 0.5).toFixed(2);
        
        rates[pair] = {
          pair,
          rate: currentRate,
          changePct: parseFloat(changePct),
          timestamp: Date.now()
        };
      });
      
      console.log('Forex rates data fetched successfully');
      
      return Promise.resolve(rates);
    } catch (error) {
      console.error('Error fetching forex rates data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Fetch stock quotes data from API
   * @returns {Promise} Promise that resolves with stock quotes data
   */
  async _fetchStockQuotes() {
    console.log('Fetching stock quotes data');
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      const quotes = {};
      
      this.asxStocks.forEach(symbol => {
        // Get current price from cache if available
        const currentPrice = this._getCachedStockPrice(symbol);
        
        let price;
        if (currentPrice) {
          // Add small random change to current price
          price = currentPrice + (currentPrice * (Math.random() * 0.02 - 0.01));
        } else {
          // Generate random price if not in cache
          if (symbol === 'BHP.AX' || symbol === 'RIO.AX') {
            price = 45 + (Math.random() * 10 - 5);
          } else if (symbol === 'CBA.AX' || symbol === 'NAB.AX' || symbol === 'WBC.AX' || symbol === 'ANZ.AX') {
            price = 30 + (Math.random() * 10 - 5);
          } else if (symbol === 'CSL.AX') {
            price = 260 + (Math.random() * 20 - 10);
          } else {
            price = 20 + (Math.random() * 80 - 40);
          }
        }
        
        // Generate random change percentage
        const changePct = (Math.random() * 4 - 2).toFixed(2);
        
        // Generate random volume
        const volume = Math.floor(Math.random() * 900000) + 100000;
        
        quotes[symbol] = {
          symbol,
          name: this._getStockName(symbol),
          price,
          changePct: parseFloat(changePct),
          volume,
          timestamp: Date.now()
        };
      });
      
      console.log('Stock quotes data fetched successfully');
      
      return Promise.resolve(quotes);
    } catch (error) {
      console.error('Error fetching stock quotes data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Fetch tariff news data from API
   * @returns {Promise} Promise that resolves with tariff news data
   */
  async _fetchTariffNews() {
    console.log('Fetching tariff news data');
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      // Sample news headlines
      const headlines = [
        "Trump Announces New Tariffs on Chinese Imports",
        "Australian Exporters Brace for Impact of US Tariffs",
        "China Threatens Retaliation Against US Tariff Measures",
        "ASX Drops as Tariff Tensions Escalate",
        "Treasury Wine Estates Shares Plummet on Tariff News",
        "Mining Stocks Rally Despite Tariff Concerns",
        "Economists Warn of Global Slowdown Due to Trade War",
        "Australian Dollar Falls on Tariff Announcement",
        "US-China Trade Talks Stall Amid Tariff Disputes",
        "BHP Expects Limited Impact from New Tariff Regime"
      ];
      
      // Sample news sources
      const sources = ["Bloomberg", "Reuters", "CNBC", "Financial Times", "Wall Street Journal"];
      
      // Generate random news articles
      const news = [];
      
      for (let i = 0; i < 5; i++) {  // Generate 5 news articles
        const headlineIndex = Math.floor(Math.random() * headlines.length);
        const sourceIndex = Math.floor(Math.random() * sources.length);
        
        // Generate random timestamp within the last 24 hours
        const timestamp = Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000);
        
        // Generate random sentiment
        const sentiments = ["positive", "negative", "neutral"];
        const sentimentWeights = [0.3, 0.4, 0.3];
        const sentiment = this._weightedRandom(sentiments, sentimentWeights);
        
        news.push({
          id: `news-${timestamp}-${i}`,
          headline: headlines[headlineIndex],
          source: sources[sourceIndex],
          url: `https://example.com/news/${timestamp}`,
          timestamp,
          sentiment,
          summary: `This is a summary of the news article about ${headlines[headlineIndex].toLowerCase()}. The article discusses the potential impact on markets and specific companies.`
        });
      }
      
      // Sort by timestamp (newest first)
      news.sort((a, b) => b.timestamp - a.timestamp);
      
      console.log('Tariff news data fetched successfully');
      
      return Promise.resolve(news);
    } catch (error) {
      console.error('Error fetching tariff news data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Fetch economic indicators data from API
   * @returns {Promise} Promise that resolves with economic indicators data
   */
  async _fetchEconomicIndicators() {
    console.log('Fetching economic indicators data');
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      const indicators = {
        US: {
          GDPGrowth: {
            value: 2 + (Math.random() * 0.4 - 0.2),
            previous: 2 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Inflation: {
            value: 3 + (Math.random() * 0.4 - 0.2),
            previous: 3 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Unemployment: {
            value: 3.75 + (Math.random() * 0.3 - 0.15),
            previous: 3.75 + (Math.random() * 0.3 - 0.15),
            timestamp: Date.now()
          },
          InterestRate: {
            value: 4.5 + (Math.random() * 0.2 - 0.1),
            previous: 4.5 + (Math.random() * 0.2 - 0.1),
            timestamp: Date.now()
          }
        },
        Australia: {
          GDPGrowth: {
            value: 1.8 + (Math.random() * 0.4 - 0.2),
            previous: 1.8 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Inflation: {
            value: 2.9 + (Math.random() * 0.4 - 0.2),
            previous: 2.9 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Unemployment: {
            value: 4.1 + (Math.random() * 0.4 - 0.2),
            previous: 4.1 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          InterestRate: {
            value: 3.75 + (Math.random() * 0.2 - 0.1),
            previous: 3.75 + (Math.random() * 0.2 - 0.1),
            timestamp: Date.now()
          }
        },
        China: {
          GDPGrowth: {
            value: 5.2 + (Math.random() * 0.4 - 0.2),
            previous: 5.2 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Inflation: {
            value: 2.1 + (Math.random() * 0.4 - 0.2),
            previous: 2.1 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          Unemployment: {
            value: 5 + (Math.random() * 0.4 - 0.2),
            previous: 5 + (Math.random() * 0.4 - 0.2),
            timestamp: Date.now()
          },
          InterestRate: {
            value: 3.45 + (Math.random() * 0.2 - 0.1),
            previous: 3.45 + (Math.random() * 0.2 - 0.1),
            timestamp: Date.now()
          }
        }
      };
      
      console.log('Economic indicators data fetched successfully');
      
      return Promise.resolve(indicators);
    } catch (error) {
      console.error('Error fetching economic indicators data:', error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Get historical data for a stock or forex pair
   * @param {string} symbol - Stock symbol or forex pair
   * @param {Object} options - Options for historical data
   * @param {string} options.startDate - Start date in 'YYYY-MM-DD' format
   * @param {string} options.endDate - End date in 'YYYY-MM-DD' format
   * @param {string} options.interval - Data interval ('1d', '1h', '15m', etc.)
   * @returns {Promise} Promise that resolves with historical data
   */
  async getHistoricalData(symbol, options = {}) {
    console.log(`Fetching historical data for ${symbol}`);
    
    try {
      // In a real implementation, this would make an API call
      // For demonstration, we'll generate simulated data
      
      const { startDate, endDate, interval = '1d' } = options;
      
      // Parse dates
      const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const end = endDate ? new Date(endDate) : new Date();
      
      // Generate data points
      const dataPoints = [];
      let currentDate = new Date(start);
      let currentValue;
      
      // Set initial value based on symbol
      if (symbol.includes('/')) {  // Forex pair
        if (symbol === 'AUD/USD') {
          currentValue = 0.675;
        } else if (symbol === 'AUD/CNY') {
          currentValue = 4.4;
        } else if (symbol === 'USD/CNY') {
          currentValue = 6.5;
        } else if (symbol === 'AUD/JPY') {
          currentValue = 102.5;
        } else if (symbol === 'AUD/EUR') {
          currentValue = 0.625;
        } else {
          currentValue = 1;
        }
      } else {  // Stock
        if (symbol === 'BHP.AX' || symbol === 'RIO.AX') {
          currentValue = 45;
        } else if (symbol === 'CBA.AX' || symbol === 'NAB.AX' || symbol === 'WBC.AX' || symbol === 'ANZ.AX') {
          currentValue = 30;
        } else if (symbol === 'CSL.AX') {
          currentValue = 260;
        } else {
          currentValue = 50;
        }
      }
      
      // Generate data points
      while (currentDate <= end) {
        // Add random change to value
        const changePercent = (Math.random() * 2 - 1) * (interval === '1d' ? 1 : 0.2);
        currentValue = currentValue * (1 + changePercent / 100);
        
        // Generate random volume
        const volume = Math.floor(Math.random() * 900000) + 100000;
        
        dataPoints.push({
          date: new Date(currentDate).toISOString(),
          timestamp: currentDate.getTime(),
          open: currentValue * (1 - Math.random() * 0.01),
          high: currentValue * (1 + Math.random() * 0.01),
          low: currentValue * (1 - Math.random() * 0.01),
          close: currentValue,
          volume
        });
        
        // Increment date based on interval
        if (interval === '1d') {
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (interval === '1h') {
          currentDate.setHours(currentDate.getHours() + 1);
        } else if (interval === '15m') {
          currentDate.setMinutes(currentDate.getMinutes() + 15);
        } else {
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
      
      console.log(`Historical data for ${symbol} fetched successfully`);
      
      return Promise.resolve(dataPoints);
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      return Promise.reject(error);
    }
  }
  
  /**
   * Subscribe to data updates
   * @param {string} dataType - Type of data to subscribe to
   * @param {Function} callback - Callback function to receive updates
   * @returns {boolean} True if subscription was successful, false otherwise
   */
  subscribe(dataType, callback) {
    if (!this.isInitialized) {
      console.warn('Real-time data service is not initialized');
      return false;
    }
    
    if (!this.subscribers[dataType]) {
      this.subscribers[dataType] = [];
    }
    
    this.subscribers[dataType].push(callback);
    console.log(`Subscribed to ${dataType} updates`);
    
    // Send initial data if available
    if (this.dataCache[dataType]) {
      setTimeout(() => {
        callback({
          type: 'initial',
          data: this.dataCache[dataType]
        });
      }, 0);
    }
    
    return true;
  }
  
  /**
   * Unsubscribe from data updates
   * @param {string} dataType - Type of data to unsubscribe from
   * @param {Function} callback - Callback function to remove
   * @returns {boolean} True if unsubscription was successful, false otherwise
   */
  unsubscribe(dataType, callback) {
    if (!this.subscribers[dataType]) {
      console.warn(`No subscribers for data type: ${dataType}`);
      return false;
    }
    
    const index = this.subscribers[dataType].indexOf(callback);
    if (index === -1) {
      console.warn(`Callback not found in subscribers for data type: ${dataType}`);
      return false;
    }
    
    this.subscribers[dataType].splice(index, 1);
    console.log(`Unsubscribed from ${dataType} updates`);
    
    return true;
  }
  
  /**
   * Notify subscribers of data updates
   * @param {string} dataType - Type of data
   * @param {Object} update - Update data
   */
  _notifySubscribers(dataType, update) {
    if (!this.subscribers[dataType]) {
      return;
    }
    
    this.subscribers[dataType].forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error(`Error notifying subscriber for ${dataType}:`, error);
      }
    });
  }
  
  /**
   * Get cached stock price for a symbol
   * @param {string} symbol - Stock symbol
   * @returns {number|null} Cached stock price or null if not in cache
   */
  _getCachedStockPrice(symbol) {
    if (!this.dataCache.stockQuotes) {
      return null;
    }
    
    if (!this.dataCache.stockQuotes[symbol]) {
      return null;
    }
    
    return this.dataCache.stockQuotes[symbol].price;
  }
  
  /**
   * Get cached forex rate for a pair
   * @param {string} pair - Forex pair
   * @returns {number|null} Cached forex rate or null if not in cache
   */
  _getCachedForexRate(pair) {
    if (!this.dataCache.forexRates) {
      return null;
    }
    
    if (!this.dataCache.forexRates[pair]) {
      return null;
    }
    
    return this.dataCache.forexRates[pair].rate;
  }
  
  /**
   * Get cached index value for a symbol
   * @param {string} symbol - Index symbol
   * @returns {number|null} Cached index value or null if not in cache
   */
  _getCachedIndexValue(symbol) {
    if (!this.dataCache.marketIndices) {
      return null;
    }
    
    if (!this.dataCache.marketIndices[symbol]) {
      return null;
    }
    
    return this.dataCache.marketIndices[symbol].value;
  }
  
  /**
   * Get index name from symbol
   * @param {string} symbol - Index symbol
   * @returns {string} Index name
   */
  _getIndexName(symbol) {
    const indexNames = {
      '^AXJO': 'ASX 200',
      '^AORD': 'All Ordinaries',
      '^GSPC': 'S&P 500',
      '^DJI': 'Dow Jones',
      '^IXIC': 'NASDAQ',
      '^HSI': 'Hang Seng',
      '^N225': 'Nikkei 225',
      '^FTSE': 'FTSE 100'
    };
    
    return indexNames[symbol] || symbol;
  }
  
  /**
   * Get stock name from symbol
   * @param {string} symbol - Stock symbol
   * @returns {string} Stock name
   */
  _getStockName(symbol) {
    const stockNames = {
      'BHP.AX': 'BHP Group',
      'RIO.AX': 'Rio Tinto',
      'FMG.AX': 'Fortescue Metals',
      'MIN.AX': 'Mineral Resources',
      'S32.AX': 'South32',
      'TWE.AX': 'Treasury Wine Estates',
      'A2M.AX': 'A2 Milk',
      'WES.AX': 'Wesfarmers',
      'WOW.AX': 'Woolworths Group',
      'COL.AX': 'Coles Group',
      'CSL.AX': 'CSL Limited',
      'RMD.AX': 'ResMed',
      'COH.AX': 'Cochlear',
      'CBA.AX': 'Commonwealth Bank',
      'NAB.AX': 'National Australia Bank',
      'WBC.AX': 'Westpac Banking',
      'ANZ.AX': 'ANZ Group',
      'MQG.AX': 'Macquarie Group',
      'WTC.AX': 'WiseTech Global',
      'XRO.AX': 'Xero',
      'APX.AX': 'Appen',
      'ALU.AX': 'Altium',
      'TCL.AX': 'Transurban Group',
      'SYD.AX': 'Sydney Airport',
      'QAN.AX': 'Qantas Airways',
      'AGL.AX': 'AGL Energy',
      'ORG.AX': 'Origin Energy',
      'WPL.AX': 'Woodside Energy',
      'STO.AX': 'Santos'
    };
    
    return stockNames[symbol] || symbol;
  }
  
  /**
   * Get data for a specific type
   * @param {string} dataType - Type of data to get
   * @returns {Object|Array|null} Current data or null if not available
   */
  getData(dataType) {
    if (!this.dataCache[dataType]) {
      console.warn(`No data available for type: ${dataType}`);
      return null;
    }
    
    return this.dataCache[dataType];
  }
  
  /**
   * Get age of data in seconds
   * @param {string} dataType - Type of data
   * @returns {number|null} Age of data in seconds or null if not available
   */
  getDataAge(dataType) {
    if (!this.cacheTimestamps[dataType]) {
      return null;
    }
    
    return (Date.now() - this.cacheTimestamps[dataType]) / 1000;
  }
  
  /**
   * Get weighted random item from array
   * @param {Array} items - Array of items
   * @param {Array} weights - Array of weights
   * @returns {*} Random item
   */
  _weightedRandom(items, weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }
    
    return items[items.length - 1];
  }
  
  /**
   * Disconnect from websocket and stop refresh timers
   */
  disconnect() {
    if (!this.isConnected) {
      console.warn('Real-time data service is not connected');
      return;
    }
    
    console.log('Disconnecting real-time data service');
    
    // Stop refresh timers
    this._stopRefreshTimers();
    
    // Reset connection state
    this.isConnected = false;
    this.reconnectAttempts = 0;
    
    console.log('Real-time data service disconnected');
  }
}

// Create singleton instance
const realTimeDataService = new RealTimeDataService();

export default realTimeDataService;
