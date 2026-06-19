const apiKeyAuth = (req, res, next) => {

    const clientApiKey = req.headers['x-api-key'];
    const validApiKey = process.env.API_KEY;

    if (!clientApiKey || clientApiKey !== validApiKey) {
        return res.status(401).json({
            error: "No autorizado. Se requiere una API Key válida en la cabecera 'x-api-key'."
        });
    }

    next();
};

module.exports = apiKeyAuth;