"""
Real-Time Data Integration Module for Trump Tariff Analysis Website

This module implements real-time data integration with market APIs,
websocket connections for streaming data, and automated refresh mechanisms.
"""

import requests
import websocket
import json
import time
import threading
import logging
from datetime import datetime, timedelta
import os
import pandas as pd
import numpy as np

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('real_time_data')

class RealTimeDataIntegration:
    def __init__(self):
        self.api_keys = self._load_api_keys()
        self.data_cache = {}
        self.cache_timestamps = {}
        self.websocket_connections = {}
        self.refresh_threads = {}
        self.subscribers = {}
        self.is_running = False
        self.data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../data/real_time')
        
        # Create data directory if it doesn't exist
        os.makedirs(self.data_dir, exist_ok=True)
        
        # Define API endpoints
        self.api_endpoints = {
            'market_indices': 'https://api.marketdata.app/v1/stocks/quotes/',
            'forex_rates': 'https://api.exchangerate.host/latest',
            'stock_quotes': 'https://api.marketdata.app/v1/stocks/quotes/',
            'tariff_news': 'https://newsapi.org/v2/everything',
            'economic_indicators': 'https://api.tradingeconomics.com/indicators'
        }
        
        # Define websocket endpoints
        self.websocket_endpoints = {
            'market_data': 'wss://ws.finnhub.io?token=',
            'forex_stream': 'wss://ws.exchangerate.host/v1/streaming'
        }
        
        # Define refresh intervals (in seconds)
        self.refresh_intervals = {
            'market_indices': 60,  # 1 minute
            'forex_rates': 300,    # 5 minutes
            'stock_quotes': 30,    # 30 seconds
            'tariff_news': 900,    # 15 minutes
            'economic_indicators': 3600  # 1 hour
        }
        
        # Define ASX stocks to track
        self.asx_stocks = [
            'BHP.AX', 'RIO.AX', 'FMG.AX', 'MIN.AX', 'S32.AX',  # Materials
            'TWE.AX', 'A2M.AX', 'WES.AX', 'WOW.AX', 'COL.AX',  # Consumer Staples
            'CSL.AX', 'RMD.AX', 'COH.AX',                      # Healthcare
            'CBA.AX', 'NAB.AX', 'WBC.AX', 'ANZ.AX', 'MQG.AX',  # Financials
            'WTC.AX', 'XRO.AX', 'APX.AX', 'ALU.AX',            # Information Technology
            'TCL.AX', 'SYD.AX', 'QAN.AX',                      # Industrials
            'AGL.AX', 'ORG.AX',                                # Utilities
            'WPL.AX', 'STO.AX'                                 # Energy
        ]
        
        # Define market indices to track
        self.market_indices = [
            '^AXJO',  # ASX 200
            '^AORD',  # All Ordinaries
            '^GSPC',  # S&P 500
            '^DJI',   # Dow Jones
            '^IXIC',  # NASDAQ
            '^HSI',   # Hang Seng
            '^N225',  # Nikkei 225
            '^FTSE'   # FTSE 100
        ]
        
        # Define forex pairs to track
        self.forex_pairs = [
            'AUD/USD', 'AUD/CNY', 'USD/CNY', 'AUD/JPY', 'AUD/EUR'
        ]
        
        # Define tariff news keywords
        self.tariff_keywords = [
            'Trump tariff', 'US China trade', 'trade war', 'import tax',
            'Australia tariff', 'China tariff', 'trade tension', 'trade policy'
        ]
        
    def _load_api_keys(self):
        """
        Load API keys from environment variables or config file
        """
        # In a real implementation, this would load from secure environment variables
        # For demonstration, we'll use placeholder keys
        return {
            'marketdata': 'demo_api_key',
            'newsapi': 'demo_api_key',
            'tradingeconomics': 'demo_api_key',
            'finnhub': 'demo_api_key',
            'exchangerate': 'demo_api_key'
        }
        
    def start(self):
        """
        Start real-time data integration
        """
        if self.is_running:
            logger.warning("Real-time data integration is already running")
            return
            
        logger.info("Starting real-time data integration")
        self.is_running = True
        
        # Start data refresh threads
        self._start_refresh_threads()
        
        # Connect to websockets
        self._connect_to_websockets()
        
        logger.info("Real-time data integration started successfully")
        
    def stop(self):
        """
        Stop real-time data integration
        """
        if not self.is_running:
            logger.warning("Real-time data integration is not running")
            return
            
        logger.info("Stopping real-time data integration")
        self.is_running = False
        
        # Stop refresh threads
        for thread_name, thread in self.refresh_threads.items():
            if thread.is_alive():
                logger.info(f"Stopping {thread_name} refresh thread")
                # Thread will exit on next iteration when is_running is checked
        
        # Close websocket connections
        for ws_name, ws in self.websocket_connections.items():
            logger.info(f"Closing {ws_name} websocket connection")
            ws.close()
            
        logger.info("Real-time data integration stopped successfully")
        
    def _start_refresh_threads(self):
        """
        Start threads for periodic data refresh
        """
        # Market indices refresh thread
        self.refresh_threads['market_indices'] = threading.Thread(
            target=self._refresh_loop,
            args=('market_indices', self._fetch_market_indices),
            daemon=True
        )
        self.refresh_threads['market_indices'].start()
        
        # Forex rates refresh thread
        self.refresh_threads['forex_rates'] = threading.Thread(
            target=self._refresh_loop,
            args=('forex_rates', self._fetch_forex_rates),
            daemon=True
        )
        self.refresh_threads['forex_rates'].start()
        
        # Stock quotes refresh thread
        self.refresh_threads['stock_quotes'] = threading.Thread(
            target=self._refresh_loop,
            args=('stock_quotes', self._fetch_stock_quotes),
            daemon=True
        )
        self.refresh_threads['stock_quotes'].start()
        
        # Tariff news refresh thread
        self.refresh_threads['tariff_news'] = threading.Thread(
            target=self._refresh_loop,
            args=('tariff_news', self._fetch_tariff_news),
            daemon=True
        )
        self.refresh_threads['tariff_news'].start()
        
        # Economic indicators refresh thread
        self.refresh_threads['economic_indicators'] = threading.Thread(
            target=self._refresh_loop,
            args=('economic_indicators', self._fetch_economic_indicators),
            daemon=True
        )
        self.refresh_threads['economic_indicators'].start()
        
    def _refresh_loop(self, data_type, fetch_function):
        """
        Continuous loop for refreshing data at specified intervals
        
        Args:
            data_type (str): Type of data to refresh
            fetch_function (callable): Function to fetch the data
        """
        logger.info(f"Starting {data_type} refresh thread")
        
        # Initial fetch
        try:
            fetch_function()
        except Exception as e:
            logger.error(f"Error in initial {data_type} fetch: {e}")
        
        # Continuous refresh loop
        while self.is_running:
            try:
                # Wait for the specified interval
                time.sleep(self.refresh_intervals[data_type])
                
                # Check if still running before fetching
                if not self.is_running:
                    break
                    
                # Fetch data
                fetch_function()
                
            except Exception as e:
                logger.error(f"Error in {data_type} refresh loop: {e}")
                # Continue the loop despite errors
                
        logger.info(f"{data_type} refresh thread stopped")
        
    def _connect_to_websockets(self):
        """
        Connect to websocket endpoints for streaming data
        """
        # In a real implementation, this would establish actual websocket connections
        # For demonstration, we'll simulate websocket connections
        
        logger.info("Connecting to market data websocket")
        self._simulate_market_data_websocket()
        
        logger.info("Connecting to forex stream websocket")
        self._simulate_forex_stream_websocket()
        
    def _simulate_market_data_websocket(self):
        """
        Simulate market data websocket connection
        """
        # Start a thread to simulate websocket messages
        self.refresh_threads['market_data_ws'] = threading.Thread(
            target=self._market_data_ws_simulator,
            daemon=True
        )
        self.refresh_threads['market_data_ws'].start()
        
    def _simulate_forex_stream_websocket(self):
        """
        Simulate forex stream websocket connection
        """
        # Start a thread to simulate websocket messages
        self.refresh_threads['forex_stream_ws'] = threading.Thread(
            target=self._forex_stream_ws_simulator,
            daemon=True
        )
        self.refresh_threads['forex_stream_ws'].start()
        
    def _market_data_ws_simulator(self):
        """
        Simulate market data websocket messages
        """
        logger.info("Market data websocket simulator started")
        
        while self.is_running:
            try:
                # Simulate receiving data every 5 seconds
                time.sleep(5)
                
                # Check if still running
                if not self.is_running:
                    break
                    
                # Generate random stock update
                stock_symbol = np.random.choice(self.asx_stocks)
                current_price = self._get_cached_stock_price(stock_symbol)
                
                if current_price is None:
                    current_price = np.random.uniform(10, 100)
                    
                # Generate small price change
                price_change = current_price * np.random.uniform(-0.005, 0.005)
                new_price = current_price + price_change
                
                # Create simulated message
                message = {
                    'type': 'trade',
                    'symbol': stock_symbol,
                    'price': new_price,
                    'volume': int(np.random.uniform(1000, 10000)),
                    'timestamp': int(time.time() * 1000)
                }
                
                # Process the message
                self._handle_market_data_message(message)
                
            except Exception as e:
                logger.error(f"Error in market data websocket simulator: {e}")
                
        logger.info("Market data websocket simulator stopped")
        
    def _forex_stream_ws_simulator(self):
        """
        Simulate forex stream websocket messages
        """
        logger.info("Forex stream websocket simulator started")
        
        while self.is_running:
            try:
                # Simulate receiving data every 10 seconds
                time.sleep(10)
                
                # Check if still running
                if not self.is_running:
                    break
                    
                # Generate random forex pair update
                forex_pair = np.random.choice(self.forex_pairs)
                current_rate = self._get_cached_forex_rate(forex_pair)
                
                if current_rate is None:
                    if forex_pair == 'AUD/USD':
                        current_rate = np.random.uniform(0.65, 0.70)
                    elif forex_pair == 'AUD/CNY':
                        current_rate = np.random.uniform(4.3, 4.5)
                    elif forex_pair == 'USD/CNY':
                        current_rate = np.random.uniform(6.4, 6.6)
                    elif forex_pair == 'AUD/JPY':
                        current_rate = np.random.uniform(100, 105)
                    elif forex_pair == 'AUD/EUR':
                        current_rate = np.random.uniform(0.60, 0.65)
                    else:
                        current_rate = np.random.uniform(0.5, 1.5)
                        
                # Generate small rate change
                rate_change = current_rate * np.random.uniform(-0.002, 0.002)
                new_rate = current_rate + rate_change
                
                # Create simulated message
                message = {
                    'type': 'rate',
                    'pair': forex_pair,
                    'rate': new_rate,
                    'timestamp': int(time.time() * 1000)
                }
                
                # Process the message
                self._handle_forex_stream_message(message)
                
            except Exception as e:
                logger.error(f"Error in forex stream websocket simulator: {e}")
                
        logger.info("Forex stream websocket simulator stopped")
        
    def _handle_market_data_message(self, message):
        """
        Handle market data websocket message
        
        Args:
            message (dict): Websocket message
        """
        if message['type'] == 'trade':
            symbol = message['symbol']
            price = message['price']
            volume = message['volume']
            timestamp = message['timestamp']
            
            # Update cache
            if 'stock_quotes' not in self.data_cache:
                self.data_cache['stock_quotes'] = {}
                
            if symbol not in self.data_cache['stock_quotes']:
                self.data_cache['stock_quotes'][symbol] = {
                    'symbol': symbol,
                    'price': price,
                    'volume': volume,
                    'timestamp': timestamp
                }
            else:
                self.data_cache['stock_quotes'][symbol]['price'] = price
                self.data_cache['stock_quotes'][symbol]['volume'] = volume
                self.data_cache['stock_quotes'][symbol]['timestamp'] = timestamp
                
            # Update cache timestamp
            self.cache_timestamps['stock_quotes'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('stock_quotes', {
                'symbol': symbol,
                'price': price,
                'volume': volume,
                'timestamp': timestamp
            })
            
            # Save to file
            self._save_stock_update_to_file(symbol, price, volume, timestamp)
            
    def _handle_forex_stream_message(self, message):
        """
        Handle forex stream websocket message
        
        Args:
            message (dict): Websocket message
        """
        if message['type'] == 'rate':
            pair = message['pair']
            rate = message['rate']
            timestamp = message['timestamp']
            
            # Update cache
            if 'forex_rates' not in self.data_cache:
                self.data_cache['forex_rates'] = {}
                
            if pair not in self.data_cache['forex_rates']:
                self.data_cache['forex_rates'][pair] = {
                    'pair': pair,
                    'rate': rate,
                    'timestamp': timestamp
                }
            else:
                self.data_cache['forex_rates'][pair]['rate'] = rate
                self.data_cache['forex_rates'][pair]['timestamp'] = timestamp
                
            # Update cache timestamp
            self.cache_timestamps['forex_rates'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('forex_rates', {
                'pair': pair,
                'rate': rate,
                'timestamp': timestamp
            })
            
            # Save to file
            self._save_forex_update_to_file(pair, rate, timestamp)
            
    def _fetch_market_indices(self):
        """
        Fetch market indices data from API
        """
        logger.info("Fetching market indices data")
        
        try:
            # In a real implementation, this would make an API call
            # For demonstration, we'll generate simulated data
            
            indices_data = {}
            
            for index in self.market_indices:
                # Generate random values
                if index == '^AXJO':  # ASX 200
                    current_value = np.random.uniform(7400, 7500)
                elif index == '^AORD':  # All Ordinaries
                    current_value = np.random.uniform(7600, 7700)
                elif index == '^GSPC':  # S&P 500
                    current_value = np.random.uniform(4800, 4900)
                elif index == '^DJI':  # Dow Jones
                    current_value = np.random.uniform(38000, 39000)
                elif index == '^IXIC':  # NASDAQ
                    current_value = np.random.uniform(15000, 15500)
                elif index == '^HSI':  # Hang Seng
                    current_value = np.random.uniform(18000, 19000)
                elif index == '^N225':  # Nikkei 225
                    current_value = np.random.uniform(38000, 39000)
                elif index == '^FTSE':  # FTSE 100
                    current_value = np.random.uniform(7800, 7900)
                else:
                    current_value = np.random.uniform(1000, 10000)
                    
                # Generate random change percentage
                change_pct = np.random.uniform(-1.0, 1.0)
                
                indices_data[index] = {
                    'symbol': index,
                    'name': self._get_index_name(index),
                    'value': current_value,
                    'change_pct': change_pct,
                    'timestamp': int(time.time() * 1000)
                }
                
            # Update cache
            self.data_cache['market_indices'] = indices_data
            self.cache_timestamps['market_indices'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('market_indices', indices_data)
            
            # Save to file
            self._save_market_indices_to_file(indices_data)
            
            logger.info("Market indices data fetched successfully")
            
        except Exception as e:
            logger.error(f"Error fetching market indices data: {e}")
            
    def _fetch_forex_rates(self):
        """
        Fetch forex rates data from API
        """
        logger.info("Fetching forex rates data")
        
        try:
            # In a real implementation, this would make an API call
            # For demonstration, we'll generate simulated data
            
            forex_data = {}
            
            for pair in self.forex_pairs:
                # Generate random values
                if pair == 'AUD/USD':
                    current_rate = np.random.uniform(0.65, 0.70)
                elif pair == 'AUD/CNY':
                    current_rate = np.random.uniform(4.3, 4.5)
                elif pair == 'USD/CNY':
                    current_rate = np.random.uniform(6.4, 6.6)
                elif pair == 'AUD/JPY':
                    current_rate = np.random.uniform(100, 105)
                elif pair == 'AUD/EUR':
                    current_rate = np.random.uniform(0.60, 0.65)
                else:
                    current_rate = np.random.uniform(0.5, 1.5)
                    
                # Generate random change percentage
                change_pct = np.random.uniform(-0.5, 0.5)
                
                forex_data[pair] = {
                    'pair': pair,
                    'rate': current_rate,
                    'change_pct': change_pct,
                    'timestamp': int(time.time() * 1000)
                }
                
            # Update cache
            self.data_cache['forex_rates'] = forex_data
            self.cache_timestamps['forex_rates'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('forex_rates', forex_data)
            
            # Save to file
            self._save_forex_rates_to_file(forex_data)
            
            logger.info("Forex rates data fetched successfully")
            
        except Exception as e:
            logger.error(f"Error fetching forex rates data: {e}")
            
    def _fetch_stock_quotes(self):
        """
        Fetch stock quotes data from API
        """
        logger.info("Fetching stock quotes data")
        
        try:
            # In a real implementation, this would make an API call
            # For demonstration, we'll generate simulated data
            
            stock_data = {}
            
            for symbol in self.asx_stocks:
                # Get current price from cache if available
                current_price = self._get_cached_stock_price(symbol)
                
                if current_price is None:
                    # Generate random price if not in cache
                    if symbol in ['BHP.AX', 'RIO.AX']:
                        current_price = np.random.uniform(40, 50)
                    elif symbol in ['CBA.AX', 'NAB.AX', 'WBC.AX', 'ANZ.AX']:
                        current_price = np.random.uniform(25, 35)
                    elif symbol == 'CSL.AX':
                        current_price = np.random.uniform(250, 270)
                    else:
                        current_price = np.random.uniform(5, 100)
                else:
                    # Add small random change to current price
                    current_price += current_price * np.random.uniform(-0.01, 0.01)
                    
                # Generate random change percentage
                change_pct = np.random.uniform(-2.0, 2.0)
                
                # Generate random volume
                volume = int(np.random.uniform(100000, 1000000))
                
                stock_data[symbol] = {
                    'symbol': symbol,
                    'name': self._get_stock_name(symbol),
                    'price': current_price,
                    'change_pct': change_pct,
                    'volume': volume,
                    'timestamp': int(time.time() * 1000)
                }
                
            # Update cache
            self.data_cache['stock_quotes'] = stock_data
            self.cache_timestamps['stock_quotes'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('stock_quotes', stock_data)
            
            # Save to file
            self._save_stock_quotes_to_file(stock_data)
            
            logger.info("Stock quotes data fetched successfully")
            
        except Exception as e:
            logger.error(f"Error fetching stock quotes data: {e}")
            
    def _fetch_tariff_news(self):
        """
        Fetch tariff-related news from API
        """
        logger.info("Fetching tariff news data")
        
        try:
            # In a real implementation, this would make an API call
            # For demonstration, we'll generate simulated data
            
            # Sample news headlines
            headlines = [
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
            ]
            
            # Sample news sources
            sources = ["Bloomberg", "Reuters", "CNBC", "Financial Times", "Wall Street Journal"]
            
            # Generate random news articles
            news_data = []
            
            for i in range(5):  # Generate 5 news articles
                headline_index = np.random.randint(0, len(headlines))
                source_index = np.random.randint(0, len(sources))
                
                # Generate random timestamp within the last 24 hours
                timestamp = int(time.time() * 1000) - np.random.randint(0, 24 * 60 * 60 * 1000)
                
                # Generate random sentiment
                sentiment = np.random.choice(["positive", "negative", "neutral"], p=[0.3, 0.4, 0.3])
                
                news_data.append({
                    'id': f"news-{timestamp}-{i}",
                    'headline': headlines[headline_index],
                    'source': sources[source_index],
                    'url': f"https://example.com/news/{timestamp}",
                    'timestamp': timestamp,
                    'sentiment': sentiment,
                    'summary': f"This is a summary of the news article about {headlines[headline_index].lower()}. The article discusses the potential impact on markets and specific companies."
                })
                
            # Sort by timestamp (newest first)
            news_data.sort(key=lambda x: x['timestamp'], reverse=True)
            
            # Update cache
            if 'tariff_news' not in self.data_cache:
                self.data_cache['tariff_news'] = news_data
            else:
                # Merge with existing news, avoiding duplicates
                existing_ids = {item['id'] for item in self.data_cache['tariff_news']}
                new_items = [item for item in news_data if item['id'] not in existing_ids]
                self.data_cache['tariff_news'] = new_items + self.data_cache['tariff_news']
                
                # Keep only the 20 most recent news items
                self.data_cache['tariff_news'] = self.data_cache['tariff_news'][:20]
                
            self.cache_timestamps['tariff_news'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('tariff_news', news_data)
            
            # Save to file
            self._save_tariff_news_to_file(self.data_cache['tariff_news'])
            
            logger.info("Tariff news data fetched successfully")
            
        except Exception as e:
            logger.error(f"Error fetching tariff news data: {e}")
            
    def _fetch_economic_indicators(self):
        """
        Fetch economic indicators data from API
        """
        logger.info("Fetching economic indicators data")
        
        try:
            # In a real implementation, this would make an API call
            # For demonstration, we'll generate simulated data
            
            indicators_data = {
                'US': {
                    'GDP Growth': {
                        'value': np.random.uniform(1.8, 2.2),
                        'previous': np.random.uniform(1.7, 2.1),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Inflation': {
                        'value': np.random.uniform(2.8, 3.2),
                        'previous': np.random.uniform(2.9, 3.3),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Unemployment': {
                        'value': np.random.uniform(3.6, 3.9),
                        'previous': np.random.uniform(3.7, 4.0),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Interest Rate': {
                        'value': np.random.uniform(4.4, 4.6),
                        'previous': np.random.uniform(4.4, 4.6),
                        'timestamp': int(time.time() * 1000)
                    }
                },
                'Australia': {
                    'GDP Growth': {
                        'value': np.random.uniform(1.6, 2.0),
                        'previous': np.random.uniform(1.7, 2.1),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Inflation': {
                        'value': np.random.uniform(2.7, 3.1),
                        'previous': np.random.uniform(2.9, 3.3),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Unemployment': {
                        'value': np.random.uniform(3.9, 4.3),
                        'previous': np.random.uniform(3.8, 4.2),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Interest Rate': {
                        'value': np.random.uniform(3.65, 3.85),
                        'previous': np.random.uniform(3.65, 3.85),
                        'timestamp': int(time.time() * 1000)
                    }
                },
                'China': {
                    'GDP Growth': {
                        'value': np.random.uniform(5.0, 5.4),
                        'previous': np.random.uniform(5.1, 5.5),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Inflation': {
                        'value': np.random.uniform(1.9, 2.3),
                        'previous': np.random.uniform(1.8, 2.2),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Unemployment': {
                        'value': np.random.uniform(4.8, 5.2),
                        'previous': np.random.uniform(4.9, 5.3),
                        'timestamp': int(time.time() * 1000)
                    },
                    'Interest Rate': {
                        'value': np.random.uniform(3.35, 3.55),
                        'previous': np.random.uniform(3.35, 3.55),
                        'timestamp': int(time.time() * 1000)
                    }
                }
            }
            
            # Update cache
            self.data_cache['economic_indicators'] = indicators_data
            self.cache_timestamps['economic_indicators'] = time.time()
            
            # Notify subscribers
            self._notify_subscribers('economic_indicators', indicators_data)
            
            # Save to file
            self._save_economic_indicators_to_file(indicators_data)
            
            logger.info("Economic indicators data fetched successfully")
            
        except Exception as e:
            logger.error(f"Error fetching economic indicators data: {e}")
            
    def _get_cached_stock_price(self, symbol):
        """
        Get cached stock price for a symbol
        
        Args:
            symbol (str): Stock symbol
            
        Returns:
            float: Cached stock price or None if not in cache
        """
        if 'stock_quotes' not in self.data_cache:
            return None
            
        if symbol not in self.data_cache['stock_quotes']:
            return None
            
        return self.data_cache['stock_quotes'][symbol]['price']
        
    def _get_cached_forex_rate(self, pair):
        """
        Get cached forex rate for a pair
        
        Args:
            pair (str): Forex pair
            
        Returns:
            float: Cached forex rate or None if not in cache
        """
        if 'forex_rates' not in self.data_cache:
            return None
            
        if pair not in self.data_cache['forex_rates']:
            return None
            
        return self.data_cache['forex_rates'][pair]['rate']
        
    def _get_index_name(self, symbol):
        """
        Get index name from symbol
        
        Args:
            symbol (str): Index symbol
            
        Returns:
            str: Index name
        """
        index_names = {
            '^AXJO': 'ASX 200',
            '^AORD': 'All Ordinaries',
            '^GSPC': 'S&P 500',
            '^DJI': 'Dow Jones',
            '^IXIC': 'NASDAQ',
            '^HSI': 'Hang Seng',
            '^N225': 'Nikkei 225',
            '^FTSE': 'FTSE 100'
        }
        
        return index_names.get(symbol, symbol)
        
    def _get_stock_name(self, symbol):
        """
        Get stock name from symbol
        
        Args:
            symbol (str): Stock symbol
            
        Returns:
            str: Stock name
        """
        stock_names = {
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
        }
        
        return stock_names.get(symbol, symbol)
        
    def _notify_subscribers(self, data_type, data):
        """
        Notify subscribers of data updates
        
        Args:
            data_type (str): Type of data
            data (dict): Updated data
        """
        if data_type not in self.subscribers:
            return
            
        for callback in self.subscribers[data_type]:
            try:
                callback(data)
            except Exception as e:
                logger.error(f"Error notifying subscriber for {data_type}: {e}")
                
    def subscribe(self, data_type, callback):
        """
        Subscribe to data updates
        
        Args:
            data_type (str): Type of data to subscribe to
            callback (callable): Callback function to receive updates
            
        Returns:
            bool: True if subscription was successful, False otherwise
        """
        if data_type not in self.refresh_intervals:
            logger.error(f"Invalid data type: {data_type}")
            return False
            
        if data_type not in self.subscribers:
            self.subscribers[data_type] = []
            
        self.subscribers[data_type].append(callback)
        logger.info(f"Subscribed to {data_type} updates")
        
        # Send initial data if available
        if data_type in self.data_cache:
            try:
                callback(self.data_cache[data_type])
            except Exception as e:
                logger.error(f"Error sending initial data to subscriber for {data_type}: {e}")
                
        return True
        
    def unsubscribe(self, data_type, callback):
        """
        Unsubscribe from data updates
        
        Args:
            data_type (str): Type of data to unsubscribe from
            callback (callable): Callback function to remove
            
        Returns:
            bool: True if unsubscription was successful, False otherwise
        """
        if data_type not in self.subscribers:
            logger.error(f"No subscribers for data type: {data_type}")
            return False
            
        if callback not in self.subscribers[data_type]:
            logger.error(f"Callback not found in subscribers for data type: {data_type}")
            return False
            
        self.subscribers[data_type].remove(callback)
        logger.info(f"Unsubscribed from {data_type} updates")
        
        return True
        
    def get_data(self, data_type):
        """
        Get current data for a specific type
        
        Args:
            data_type (str): Type of data to get
            
        Returns:
            dict: Current data or None if not available
        """
        if data_type not in self.data_cache:
            logger.warning(f"No data available for type: {data_type}")
            return None
            
        return self.data_cache[data_type]
        
    def get_data_age(self, data_type):
        """
        Get age of data in seconds
        
        Args:
            data_type (str): Type of data
            
        Returns:
            float: Age of data in seconds or None if not available
        """
        if data_type not in self.cache_timestamps:
            return None
            
        return time.time() - self.cache_timestamps[data_type]
        
    def _save_market_indices_to_file(self, indices_data):
        """
        Save market indices data to file
        
        Args:
            indices_data (dict): Market indices data
        """
        try:
            # Convert to DataFrame
            data_list = []
            for symbol, data in indices_data.items():
                data_list.append({
                    'symbol': symbol,
                    'name': data['name'],
                    'value': data['value'],
                    'change_pct': data['change_pct'],
                    'timestamp': data['timestamp']
                })
                
            df = pd.DataFrame(data_list)
            
            # Save to CSV
            file_path = os.path.join(self.data_dir, 'market_indices.csv')
            df.to_csv(file_path, index=False)
            
        except Exception as e:
            logger.error(f"Error saving market indices to file: {e}")
            
    def _save_forex_rates_to_file(self, forex_data):
        """
        Save forex rates data to file
        
        Args:
            forex_data (dict): Forex rates data
        """
        try:
            # Convert to DataFrame
            data_list = []
            for pair, data in forex_data.items():
                data_list.append({
                    'pair': pair,
                    'rate': data['rate'],
                    'change_pct': data['change_pct'],
                    'timestamp': data['timestamp']
                })
                
            df = pd.DataFrame(data_list)
            
            # Save to CSV
            file_path = os.path.join(self.data_dir, 'forex_rates.csv')
            df.to_csv(file_path, index=False)
            
        except Exception as e:
            logger.error(f"Error saving forex rates to file: {e}")
            
    def _save_stock_quotes_to_file(self, stock_data):
        """
        Save stock quotes data to file
        
        Args:
            stock_data (dict): Stock quotes data
        """
        try:
            # Convert to DataFrame
            data_list = []
            for symbol, data in stock_data.items():
                data_list.append({
                    'symbol': symbol,
                    'name': data['name'],
                    'price': data['price'],
                    'change_pct': data['change_pct'],
                    'volume': data['volume'],
                    'timestamp': data['timestamp']
                })
                
            df = pd.DataFrame(data_list)
            
            # Save to CSV
            file_path = os.path.join(self.data_dir, 'stock_quotes.csv')
            df.to_csv(file_path, index=False)
            
        except Exception as e:
            logger.error(f"Error saving stock quotes to file: {e}")
            
    def _save_stock_update_to_file(self, symbol, price, volume, timestamp):
        """
        Save stock update to historical data file
        
        Args:
            symbol (str): Stock symbol
            price (float): Stock price
            volume (int): Trading volume
            timestamp (int): Timestamp in milliseconds
        """
        try:
            # Create directory for historical data if it doesn't exist
            historical_dir = os.path.join(self.data_dir, 'historical')
            os.makedirs(historical_dir, exist_ok=True)
            
            # Create file path
            file_path = os.path.join(historical_dir, f"{symbol}_historical.csv")
            
            # Check if file exists
            file_exists = os.path.isfile(file_path)
            
            # Create DataFrame for new data
            new_data = pd.DataFrame([{
                'symbol': symbol,
                'price': price,
                'volume': volume,
                'timestamp': timestamp,
                'datetime': datetime.fromtimestamp(timestamp / 1000).strftime('%Y-%m-%d %H:%M:%S')
            }])
            
            if file_exists:
                # Append to existing file
                new_data.to_csv(file_path, mode='a', header=False, index=False)
            else:
                # Create new file
                new_data.to_csv(file_path, index=False)
                
        except Exception as e:
            logger.error(f"Error saving stock update to file: {e}")
            
    def _save_forex_update_to_file(self, pair, rate, timestamp):
        """
        Save forex update to historical data file
        
        Args:
            pair (str): Forex pair
            rate (float): Exchange rate
            timestamp (int): Timestamp in milliseconds
        """
        try:
            # Create directory for historical data if it doesn't exist
            historical_dir = os.path.join(self.data_dir, 'historical')
            os.makedirs(historical_dir, exist_ok=True)
            
            # Create file path
            file_path = os.path.join(historical_dir, f"{pair.replace('/', '_')}_historical.csv")
            
            # Check if file exists
            file_exists = os.path.isfile(file_path)
            
            # Create DataFrame for new data
            new_data = pd.DataFrame([{
                'pair': pair,
                'rate': rate,
                'timestamp': timestamp,
                'datetime': datetime.fromtimestamp(timestamp / 1000).strftime('%Y-%m-%d %H:%M:%S')
            }])
            
            if file_exists:
                # Append to existing file
                new_data.to_csv(file_path, mode='a', header=False, index=False)
            else:
                # Create new file
                new_data.to_csv(file_path, index=False)
                
        except Exception as e:
            logger.error(f"Error saving forex update to file: {e}")
            
    def _save_tariff_news_to_file(self, news_data):
        """
        Save tariff news data to file
        
        Args:
            news_data (list): Tariff news data
        """
        try:
            # Convert to DataFrame
            df = pd.DataFrame(news_data)
            
            # Save to CSV
            file_path = os.path.join(self.data_dir, 'tariff_news.csv')
            df.to_csv(file_path, index=False)
            
        except Exception as e:
            logger.error(f"Error saving tariff news to file: {e}")
            
    def _save_economic_indicators_to_file(self, indicators_data):
        """
        Save economic indicators data to file
        
        Args:
            indicators_data (dict): Economic indicators data
        """
        try:
            # Convert to DataFrame
            data_list = []
            for country, indicators in indicators_data.items():
                for indicator, data in indicators.items():
                    data_list.append({
                        'country': country,
                        'indicator': indicator,
                        'value': data['value'],
                        'previous': data['previous'],
                        'timestamp': data['timestamp']
                    })
                    
            df = pd.DataFrame(data_list)
            
            # Save to CSV
            file_path = os.path.join(self.data_dir, 'economic_indicators.csv')
            df.to_csv(file_path, index=False)
            
        except Exception as e:
            logger.error(f"Error saving economic indicators to file: {e}")
            
    def get_historical_data(self, symbol, start_date=None, end_date=None):
        """
        Get historical data for a stock or forex pair
        
        Args:
            symbol (str): Stock symbol or forex pair
            start_date (str, optional): Start date in 'YYYY-MM-DD' format
            end_date (str, optional): End date in 'YYYY-MM-DD' format
            
        Returns:
            pandas.DataFrame: Historical data or None if not available
        """
        try:
            # Format symbol for file path
            if '/' in symbol:  # Forex pair
                file_symbol = symbol.replace('/', '_')
            else:  # Stock
                file_symbol = symbol
                
            # Create file path
            file_path = os.path.join(self.data_dir, 'historical', f"{file_symbol}_historical.csv")
            
            # Check if file exists
            if not os.path.isfile(file_path):
                logger.warning(f"No historical data file for {symbol}")
                return None
                
            # Read CSV file
            df = pd.read_csv(file_path)
            
            # Convert timestamp to datetime
            df['datetime'] = pd.to_datetime(df['datetime'])
            
            # Filter by date range if specified
            if start_date:
                start_date = pd.to_datetime(start_date)
                df = df[df['datetime'] >= start_date]
                
            if end_date:
                end_date = pd.to_datetime(end_date)
                df = df[df['datetime'] <= end_date]
                
            return df
            
        except Exception as e:
            logger.error(f"Error getting historical data for {symbol}: {e}")
            return None
            
    def get_latest_tariff_news(self, limit=10):
        """
        Get latest tariff news
        
        Args:
            limit (int, optional): Maximum number of news items to return
            
        Returns:
            list: Latest tariff news items or empty list if not available
        """
        if 'tariff_news' not in self.data_cache:
            logger.warning("No tariff news data available")
            return []
            
        # Return the specified number of latest news items
        return self.data_cache['tariff_news'][:limit]
        
    def get_market_indices(self):
        """
        Get current market indices data
        
        Returns:
            dict: Market indices data or empty dict if not available
        """
        if 'market_indices' not in self.data_cache:
            logger.warning("No market indices data available")
            return {}
            
        return self.data_cache['market_indices']
        
    def get_forex_rates(self):
        """
        Get current forex rates data
        
        Returns:
            dict: Forex rates data or empty dict if not available
        """
        if 'forex_rates' not in self.data_cache:
            logger.warning("No forex rates data available")
            return {}
            
        return self.data_cache['forex_rates']
        
    def get_stock_quotes(self, symbols=None):
        """
        Get current stock quotes data
        
        Args:
            symbols (list, optional): List of stock symbols to get quotes for
            
        Returns:
            dict: Stock quotes data or empty dict if not available
        """
        if 'stock_quotes' not in self.data_cache:
            logger.warning("No stock quotes data available")
            return {}
            
        if symbols is None:
            return self.data_cache['stock_quotes']
            
        # Filter by specified symbols
        return {symbol: data for symbol, data in self.data_cache['stock_quotes'].items() if symbol in symbols}
        
    def get_economic_indicators(self, countries=None):
        """
        Get current economic indicators data
        
        Args:
            countries (list, optional): List of countries to get indicators for
            
        Returns:
            dict: Economic indicators data or empty dict if not available
        """
        if 'economic_indicators' not in self.data_cache:
            logger.warning("No economic indicators data available")
            return {}
            
        if countries is None:
            return self.data_cache['economic_indicators']
            
        # Filter by specified countries
        return {country: data for country, data in self.data_cache['economic_indicators'].items() if country in countries}

# Create a singleton instance
real_time_data = RealTimeDataIntegration()

# Example usage
if __name__ == "__main__":
    # Start real-time data integration
    real_time_data.start()
    
    # Subscribe to stock quotes updates
    def stock_quotes_callback(data):
        print(f"Received stock quotes update: {len(data)} stocks")
        
    real_time_data.subscribe('stock_quotes', stock_quotes_callback)
    
    # Wait for some data to be collected
    time.sleep(10)
    
    # Get current stock quotes
    stock_quotes = real_time_data.get_stock_quotes()
    print(f"Current stock quotes: {len(stock_quotes)} stocks")
    
    # Get latest tariff news
    tariff_news = real_time_data.get_latest_tariff_news(limit=3)
    print(f"Latest tariff news: {len(tariff_news)} items")
    
    # Stop real-time data integration
    real_time_data.stop()
