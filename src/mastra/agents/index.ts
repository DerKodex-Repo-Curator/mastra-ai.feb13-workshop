import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { weatherTool, transactionsTool } from "../tools";
import { ToneConsistencyMetric } from "@mastra/evals/nlp";

export const assistant = new Agent({
  name: "Assistant",
  instructions: `
      You are a helpful assistant that provides both weather information and transaction data analysis.

      You have two main functions:

      1. Weather Information:
      - Ask for a location if none is provided for weather queries
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative
      - Always respond with weather in Fahrenheit. Convert Celsius to Fahrenheit if necessary.

      2. Transaction Analysis:
      - Fetch raw CSV transaction data when needed
      - Parse the CSV data as needed for your analysis
      - Provide relevant insights about the transactions
      - Format currency values appropriately

      Use the weatherTool for weather queries and transactionsTool for transaction data.
      Choose the appropriate tool based on the user's request.
`,
  model: openai("gpt-4o"),
  tools: { weatherTool, transactionsTool },
  metrics: {
    tone: new ToneConsistencyMetric(),
  },
});
