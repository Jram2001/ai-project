const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
});

/**
 * Uploads a buffer (file) to the S3 bucket
 * @param {Buffer} fileBuffer - The actual file data
 * @param {string} fileName - Original name of the file
 * @param {string} tenantId - The ID of the business owner
 */
const uploadFile = async (fileBuffer, fileName, tenantId) => {
    // We create a unique key: specs/tenant_123/1708560000-petstore.json
    const key = `specs/${tenantId}/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: fileName.endsWith('.json') ? 'application/json' : 'text/yaml',
    });

    try {
        await s3Client.send(command);
        return key; // We return the key so we can save it in MongoDB
    } catch (err) {
        console.error("S3 Upload Error:", err);
        throw new Error("Cloud Storage failed");
    }
};

module.exports = { uploadFile };