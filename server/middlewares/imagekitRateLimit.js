const WINDOW_MS = Number(process.env.IMAGEKIT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const MAX_REQUESTS = Number(process.env.IMAGEKIT_RATE_LIMIT_MAX || 10);

const requestStore = new Map();

const getClientKey = (req) => req.userId || req.ip || 'anonymous';

// Periodically clear stale entries so in-memory storage does not grow forever.
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requestStore.entries()) {
        if (now > value.resetAt) {
            requestStore.delete(key);
        }
    }
}, WINDOW_MS).unref();

export const imagekitRateLimit = (req, res, next) => {
    const key = getClientKey(req);
    const now = Date.now();

    const current = requestStore.get(key);

    if (!current || now > current.resetAt) {
        requestStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return next();
    }

    current.count += 1;

    if (current.count > MAX_REQUESTS) {
        const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);
        res.setHeader('Retry-After', String(retryAfterSeconds));
        return res.status(429).json({
            message: 'Too many ImageKit upload requests. Please try again later.',
            retryAfterSeconds,
        });
    }

    return next();
};
