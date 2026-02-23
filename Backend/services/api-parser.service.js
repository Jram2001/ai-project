const SwaggerParser = require("@apidevtools/swagger-parser");

/**
 * Business Logic: Processes a Swagger URL and returns AI-ready tools
 */
const parseAndSimplify = async (swaggerUrl) => {
    // 1. Validate and dereference (resolves $refs)
    const api = await SwaggerParser.validate(swaggerUrl);

    const tools = [];

    // 2. Extract endpoints and format for the AI
    Object.entries(api.paths).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, detail]) => {
            tools.push({
                tool_id: detail.operationId || `${method}_${path.replace(/\//g, '_')}`,
                description: detail.summary || detail.description || "Action endpoint",
                endpoint: path,
                method: method.toUpperCase(),
                parameters: detail.parameters || detail.requestBody || {}
            });
        });
    });

    return {
        api_name: api.info.title,
        total_tools: tools.length,
        tools: tools
    };
};

module.exports = {
    parseAndSimplify
};