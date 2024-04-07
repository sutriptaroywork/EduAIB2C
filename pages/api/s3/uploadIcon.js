import s3Client from '../../../components/Utils/s3Client';
import formidable from 'formidable-serverless';
import fs from 'fs';

const s3 = s3Client
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing the form data' });
        }

        const file = files.file;
        if(!file || !file.path) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileContent = fs.readFileSync(file.path);
        const fileName = file.name.replace(/\s+/g, '_'); 
        const uploadParams = {
            Bucket: "shikshaml-b2c",
            Key: `icons/${Date.now()}${fileName}`,
            Body: fileContent,
            ContentType: file.type,
        };

        try {
            const uploadResponse = await s3.upload(uploadParams).promise();
            res.status(200).json({ url: uploadResponse });
        } catch (uploadError) {
            res.status(500).json({ error: 'Error uploading to S3' });
        }
    });
}

