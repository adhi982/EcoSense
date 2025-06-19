import { NextResponse } from 'next/server'

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const OPENAQ_API_URL = 'https://api.openaq.org/v2/latest'
const WATER_QUALITY_API_URL = 'https://api.openaq.org/v2/measurements'

// Free API endpoints and parameters
const WEATHER_PARAMS = {
  units: 'metric', // For Celsius
  lang: 'en',
  appid: process.env.OPENWEATHER_API_KEY || ''
}

const CLIMATE_TOPICS = [
  //Original topics
  'climate change',
  'carbon footprint',
  'renewable energy',
  'sustainable living',
  'green energy',
  'emissions',
  'environmental impact',
  'sustainability',
  'eco-friendly',
  'carbon emissions',
  'global warming',
  'clean energy',
  'solar power',
  'wind energy',
  'energy efficiency',
  'waste reduction',
  'recycling',
  'conservation',
  'biodiversity',
  'pollution',
  'air quality',
  'weather',
  'climate condition',
  'environmental condition',
  'water quality',
  'water pollution',

  // Added topics – temperature & humidity
  'temperature monitoring',
  'ambient temperature',
  'surface temperature',
  'soil temperature',
  'sea surface temperature',
  'urban heat island',
  'temperature anomalies',
  'relative humidity',
  'absolute humidity',
  'dew point',
  'vapor pressure',
  'humidity control',
  'moisture levels',
  'soil moisture',
  'microclimate',

  //Built environment & green design
  'green building',
  'LEED certification',
  'passive house',
  'energy auditing',
  'HVAC efficiency',
  'thermal comfort',
  'green roofs',
  'rainwater harvesting',
  'greywater reuse',
  'building insulation',
  'smart thermostats',
  'smart grid',
  'net-zero energy',
  'circular economy',

  // Agriculture & land use
  'sustainable agriculture',
  'organic farming',
  'permaculture',
  'agroforestry',
  'soil conservation',
  'land restoration',
  'afforestation',
  'reforestation',
  'carbon sequestration',

  // Water & ocean systems
  'water conservation',
  'watershed management',
  'ocean acidification',
  'wetland restoration',
  'marine conservation',

  // Policy, finance & culture
  'climate policy',
  'carbon pricing',
  'emissions trading',
  'environmental regulation',
  'green finance',
  'sustainable investment',
  'green bonds',
  'environmental justice',
  'climate resilience',
  'adaptation strategies',
  'mitigation measures',
  'public transit',
  'electric vehicles',
  'green transportation',
  'biking infrastructure',
  'pedestrian-friendly design',
  'green jobs',
  'environmental education',
  'ecotourism',
  'corporate sustainability',
  'sustainable supply chains',

  //Ecosystems & biodiversity
  'habitat protection',
  'species migration',
  'ecosystem services',
  'pollinator health',
  'wildlife corridors'
]

// Add common misspellings and variations
const CLIMATE_TOPICS_VARIATIONS = {
  'climate change': ['climat', 'climte', 'climte change', 'climat change'],
  'carbon footprint': ['carbon footprnt', 'carbon footprin', 'carbon foot print'],
  'renewable energy': ['renewable enrgy', 'renewable enegy', 'renewable enrgy'],
  'sustainable living': ['sustaintable', 'sustainble', 'sustanable', 'sustainabl living'],
  'green energy': ['green enrgy', 'green enegy'],
  'emissions': ['emision', 'emision', 'emissions'],
  'environmental impact': ['envirnmental', 'enviornmental', 'envirnmental impact'],
  'sustainability': ['sustaintability', 'sustainbility', 'sustanability'],
  'eco-friendly': ['eco frendly', 'eco frendly', 'ecofriendly'],
  'carbon emissions': ['carbon emision', 'carbon emision'],
  'global warming': ['global warmng', 'global warmin'],
  'clean energy': ['clean enrgy', 'clean enegy'],
  'solar power': ['solar pwer', 'solar powr'],
  'wind energy': ['wind enrgy', 'wind enegy'],
  'energy efficiency': ['enrgy efficiency', 'enegy efficiency'],
  'waste reduction': ['waste reducion', 'waste reduciton'],
  'recycling': ['recyling', 'recyclying'],
  'conservation': ['conservatin', 'conservtion'],
  'biodiversity': ['biodiversty', 'biodiverity'],
  'pollution': ['polution', 'pollutin'],
  'air quality': ['air qulity', 'air qualty'],
  'weather': ['weathr', 'weater'],
  'climate condition': ['climat condition', 'climte condition'],
  'environmental condition': ['envirnmental condition', 'enviornmental condition'],
  'water quality': ['water qulity', 'water qualty'],
  'water pollution': ['water polution', 'water pollutin']
};

function isClimateRelated(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Check for exact matches
  if (CLIMATE_TOPICS.some(topic => lowerMessage.includes(topic))) {
    return true;
  }
  
  // Check for variations and misspellings
  for (const [topic, variations] of Object.entries(CLIMATE_TOPICS_VARIATIONS)) {
    if (lowerMessage.includes(topic) || variations.some(variation => lowerMessage.includes(variation))) {
      return true;
    }
  }
  
  // Check for partial matches (e.g., "sustain" would match "sustainable")
  const partialMatches = CLIMATE_TOPICS.some(topic => {
    const words = topic.split(' ');
    return words.some(word => lowerMessage.includes(word));
  });
  
  if (partialMatches) {
    return true;
  }
  
  return false;
}

function getQueryType(message: string): 'air' | 'water' | 'all' | 'general_climate' {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes('air') || lowerMessage.includes('pollution')) {
    return 'air'
  }
  if (lowerMessage.includes('water')) {
    return 'water'
  }
  // Check for location keywords last
  if (lowerMessage.includes('in') || lowerMessage.includes('at') || lowerMessage.includes('near') || lowerMessage.includes('around')) {
      return 'all' // General location query
  }
  return 'general_climate' // Default for non-location climate topics
}

async function getLocationData(city: string, queryType: 'air' | 'water' | 'all') {
  try {
    const data: any = {}

    // Get weather data if needed
    if (queryType === 'all') {
      const weatherParams = new URLSearchParams({
        q: city,
        units: WEATHER_PARAMS.units,
        lang: WEATHER_PARAMS.lang,
        appid: WEATHER_PARAMS.appid
      })
      const weatherResponse = await fetch(
        `${OPENWEATHER_API_URL}?${weatherParams.toString()}`
      )
      const weatherData = await weatherResponse.json()

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherData.message}`)
      }
      data.weather = weatherData
    }

    // Get air quality data if needed
    if (queryType === 'air' || queryType === 'all') {
      try {
        const aqResponse = await fetch(
          `${OPENAQ_API_URL}?city=${city}&limit=1`
        )
        const aqData = await aqResponse.json()
        data.airQuality = aqData
      } catch (error) {
        data.airQuality = {
          error: true,
          message: "I'm unable to fetch real-time air quality data at the moment. However, I can provide general information about air quality in this area."
        }
      }
    }

    // Get water quality data if needed
    if (queryType === 'water' || queryType === 'all') {
      try {
        const waterResponse = await fetch(
          `${WATER_QUALITY_API_URL}?city=${city}&parameter=ph,o3,no2,so2,co&limit=5`
        )
        const waterData = await waterResponse.json()
        data.waterQuality = waterData
      } catch (error) {
        data.waterQuality = {
          error: true,
          message: "I'm unable to fetch real-time water quality data at the moment. However, I can provide general information about water quality in this area."
        }
      }
    }

    return data
  } catch (error) {
    console.error('Error fetching location data:', error)
    return {
      error: true,
      message: "I'm having trouble accessing the environmental data right now. I can still provide general information about environmental conditions in this area."
    }
  }
}

function getAQIStatus(value: number): string {
  if (value <= 50) return 'Good'
  if (value <= 100) return 'Moderate'
  if (value <= 150) return 'Unhealthy for Sensitive Groups'
  if (value <= 200) return 'Unhealthy'
  if (value <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

function getWaterQualityStatus(ph: number): string {
  if (ph < 6.5) return 'Acidic'
  if (ph > 8.5) return 'Alkaline'
  return 'Neutral'
}

function extractLocation(message: string): string | null {
  const locationMatch = message.match(/(?:in|at|near|around)\s+([A-Za-z\s]+)/i)
  return locationMatch ? locationMatch[1].trim() : null
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!isClimateRelated(message)) {
      return NextResponse.json({
        error: "🌱 I'm sorry, but I can only answer questions related to climate change, renewable energy, carbon footprints, and sustainable living. Please ask me something about these topics! Also, please check for any spelling mistakes in your question."
      })
    }

    const location = extractLocation(message)
    const queryType = getQueryType(message)
    let locationData = null
    if (location) {
      // Only fetch location data if a location is identified
      if (queryType === 'air' || queryType === 'water' || queryType === 'all') {
         locationData = await getLocationData(location, queryType)
      }
    }

    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-tiny',
        messages: [
          {
            role: 'system',
            content: `You are an AI Climate Mentor, focused on helping users understand climate change and sustainability in a simple, engaging way. **Crucially, be tolerant of minor spelling mistakes and typos in user input.** For example, interpret 'sustaintable' as 'sustainable'. Follow these other guidelines:

1. Keep responses concise, ideally under 100 words.
2. Use bullet points or short paragraphs for clarity.
3. Include relevant emojis (🌱🌍♻️🌞💧 etc.) to make it engaging.
4. Break down complex topics into simple concepts.
5. Focus on practical, actionable information.
6. Use friendly, conversational language.
7. Avoid technical jargon unless necessary.
8. Always end with a positive note or tip.

Here are the specific formats to use based on the user's query type:

For general climate topics (like carbon footprints, renewable energy, sustainable living tips, understanding climate change):
🌱 Quick Answer: [1-2 sentences summary]
💡 Key Points:
• [Point 1]
• [Point 2]
• [Point 3]
✨ Tip: [A practical piece of advice]

For air quality queries (when a location is specified):
🌫️ Air Quality Report for [Location]:
• PM2.5: [exact number] μg/m³
• PM10: [exact number] μg/m³
• Ozone: [exact number] ppb
• Status: [Good/Moderate/Poor]

⚠️ Health Impact:
• [Specific health concerns]
• [Vulnerable groups]

💡 Air Quality Tips:
• [Tip 1]
• [Tip 2]

For water quality queries (when a location is specified):
💧 Water Quality Report for [Location]:
• pH Level: [exact number]
• Dissolved Oxygen: [exact number] mg/L
• Turbidity: [exact number] NTU
• Status: [Good/Moderate/Poor]

⚠️ Water Concerns:
• [Specific water issues]
• [Impact on health/environment]

💡 Water Conservation Tips:
• [Tip 1]
• [Tip 2]

For general environmental conditions queries (when a location is specified):
🌡️ Current Weather for [Location]:
• Temperature: [exact number]°C
• Feels Like: [exact number]°C
• Humidity: [exact number]%
• Wind Speed: [exact number] km/h
• Weather: [description]

🌫️ Air Quality:
• PM2.5: [exact number] μg/m³
• PM10: [exact number] μg/m³
• Ozone: [exact number] ppb
• Status: [Good/Moderate/Poor]

💧 Water Quality:
• pH Level: [exact number]
• Dissolved Oxygen: [exact number] mg/L
• Turbidity: [exact number] NTU
• Status: [Good/Moderate/Poor]

⚠️ Environmental Concerns:
• [Issue 1 with exact numbers]
• [Issue 2 with exact numbers]

💡 Local Solutions:
• [Solution 1]
• [Solution 2]

✨ Tip: [Practical advice for the location]

If data is not available for a location, provide general information about environmental conditions in the area and focus on practical tips and solutions. Never mention API or technical issues.

If asked about non-environmental topics, politely redirect to climate-related subjects.`,
          },
          {
            role: 'user',
            content: locationData 
              ? `${message}

Location Data:
Weather: ${JSON.stringify(locationData.weather)}
Air Quality: ${JSON.stringify(locationData.airQuality)}
Water Quality: ${JSON.stringify(locationData.waterQuality)}`
              : message,
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Mistral AI')
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: '😔 I apologize, but I encountered an error. Please try asking your question again.' },
      { status: 500 }
    )
  }
} 