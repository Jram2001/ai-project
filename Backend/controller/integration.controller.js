const apiParser = require('../services/api-parser.service');

const ingestApi = async (req, res) => {
    const { swaggerUrl } = req.body;

    if (!swaggerUrl) {
        return res.status(400).json({ success: false, error: "Please provide a swaggerUrl" });
    }

    try {
        // We pass only the data (swaggerUrl) to the service, NOT req or res
        const result = await apiParser.parseAndSimplify(swaggerUrl);

        res.status(200).json({
            success: true,
            message: "API Ingested Successfully",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Failed to parse API",
            details: err.message
        });
    }
};

module.exports = { ingestApi };