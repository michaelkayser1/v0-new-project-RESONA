import { Ratelimit } from "@upstash/ratelimit"
import kv from "@vercel/kv"

/**
 * Creates a rate limiter with the specified configuration
 * @param {number} limit - Number of requests allowed in the window
 * @param {string} window - Time window (e.g., "10s", "1m", "1h")
 * @param {string} prefix - Prefix for Redis keys
 * @returns {Ratelimit} Rate limiter instance
 */
export function createRateLimiter(limit = 5, window = "30s", prefix = "api_ratelimit") {
  return new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(limit, window),
    analytics: true,
    prefix,
  })
}

/**
 * Applies rate limiting to a request
 * @param {Request} req - The request object
 * @param {Ratelimit} limiter - The rate limiter instance
 * @param {string} identifier - Optional identifier override
 * @returns {Promise<{success: boolean, headers: Headers, response?: Response}>}
 */
export async function applyRateLimit(req, limiter, identifier = null) {
  // Get client identifier (IP by default)
  const ip = identifier || req.ip || req.headers.get("x-forwarded-for") || "anonymous"

  // Apply rate limiting
  const { success, limit, remaining, reset } = await limiter.limit(ip)

  // Create response headers
  const headers = new Headers({
    "RateLimit-Limit": limit.toString(),
    "RateLimit-Remaining": remaining.toString(),
    "RateLimit-Reset": reset.toString(),
  })

  // If rate limit exceeded, return error response
  if (!success) {
    const response = new Response(
      JSON.stringify({
        error: "Too many requests",
        message: "Please try again later",
        reset: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(headers.entries()),
        },
      },
    )

    return { success, headers, response }
  }

  return { success, headers }
}
