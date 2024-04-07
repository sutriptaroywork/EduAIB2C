import AWS from 'aws-sdk';

const s3Client = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRETKEY,
    region: process.env.NEXT_PUBLIC_S3_REGION,
});
export default s3Client