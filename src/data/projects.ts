/** Project content. Add a new project here and it shows up in the Projects section. */
export const projects = [
	{
		title: "IPL Analytics Dashboard",
		createdAt: "2026-06-01",
		priority: 15,
		description:
			"An interactive and dynamic **Power BI Dashboard** that provides comprehensive insights into Indian Premier League (IPL) matches, team performances, and player statistics across multiple seasons.\n\n" +
			"This dashboard is designed to analyze IPL historical data to help cricket enthusiasts, analysts, and franchise managers gain deep insights into match trends, player profiles, and team statistics.\n\n" +
			"The dashboard leverages **Power Query** for data transformation, **DAX (Data Analysis Expressions)** for advanced calculations/measures, and modern **Power BI visuals** for interactive storytelling.",
		image:
			"https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80",
		tags: ["Power BI", "Data Analytics", "EDA", "SQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/IPL-Dashboard",
	},
	{
		title: "Stock Market Analytics Dashboard",
		createdAt: "2026-06-15",
		priority: 16,
		description:
			"The **Stock Market Analytics Dashboard** is a comprehensive, interactive Power BI suite designed to analyze stock market behavior. Utilizing **5-minute OHLCV (Open, High, Low, Close, Volume)** historical data, it computes and visualizes trend metrics, momentum indicators, volatility indices, and key candlestick statistical behaviors to empower traders and analysts with actionable market insights.\n\n" +
			"Key Objectives:\n" +
			"* **Price Analysis**: Track intraday trend cycles and micro-movements.\n" +
			"* **Trend Detection**: Highlight market directions using multi-interval Moving Averages and Cross-over markers.\n" +
			"* **Momentum Monitoring**: Gauge oversold and overbought conditions.\n" +
			"* **Volatility Analysis**: Quantify risk parameters using price deviations.\n" +
			"* **Candlestick Statistics**: Measure structural candle configurations (wicks, body proportions).\n" +
			"* **Interactive Design**: Deliver a modern dashboard optimized for performance.",
		image:
			"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
		tags: ["Power BI", "Python", "Data Analytics", "Finance", "SQL"],
		githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Analytics-Dashboard",
	},
];

export type Project = (typeof projects)[number];
