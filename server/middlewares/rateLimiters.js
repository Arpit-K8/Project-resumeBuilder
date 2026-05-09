import rateLimit from 'express-rate-limit';

// Rate limiter for OpenAI endpoints
export const aiRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 10, // Limit each IP to 10 requests per `window` (here, per hour)
    message: { message: 'Too many requests to AI services from this IP, please try again after 1 hour' },
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rate limiter for ImageKit upload endpoints
export const imageUploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5, // Limit each IP to 5 image uploads per hour
    message: { message: 'Too many image uploads from this IP, please try again after 1 hour' },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
