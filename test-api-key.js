// Enhanced API key test script
async function testApiKeyDetailed() {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.error("❌ No API key found in environment variables")
    return
  }

  if (!apiKey.startsWith("sk-")) {
    console.error("❌ API key format appears incorrect (should start with sk-)")
    return
  }

  console.log("🔑 API Key format looks correct")
  console.log("🔑 API Key length:", apiKey.length)
  console.log("🔑 API Key prefix:", apiKey.substring(0, 10) + "...")

  try {
    // Test 1: Check if we can access the models endpoint
    console.log("\n🧪 Testing models endpoint...")
    const modelsResponse = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!modelsResponse.ok) {
      const errorData = await modelsResponse.json()
      console.error("❌ Models endpoint failed:", modelsResponse.status, errorData)
      return
    }

    const modelsData = await modelsResponse.json()
    console.log("✅ Models endpoint success. Available models:", modelsData.data.length)

    // Test 2: Try a simple chat completion
    console.log("\n🧪 Testing chat completion...")
    const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say hello in exactly 3 words." },
        ],
        max_tokens: 10,
        temperature: 0.7,
      }),
    })

    if (!chatResponse.ok) {
      const errorData = await chatResponse.json()
      console.error("❌ Chat completion failed:", chatResponse.status, errorData)

      // Common error interpretations
      if (chatResponse.status === 401) {
        console.error("🚨 Authentication failed - API key is invalid")
      } else if (chatResponse.status === 429) {
        console.error("🚨 Rate limit exceeded - too many requests")
      } else if (chatResponse.status === 402) {
        console.error("🚨 Billing issue - check your OpenAI account balance")
      }
      return
    }

    const chatData = await chatResponse.json()
    console.log("✅ Chat completion success!")
    console.log("📝 Response:", chatData.choices[0].message.content)
    console.log("💰 Tokens used:", chatData.usage)
  } catch (error) {
    console.error("❌ Network error:", error.message)
  }
}

// Run the test
testApiKeyDetailed()
