/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
   reactStrictMode: false,
   images: {
     domains: ['http://164.52.202.60/',"164.52.202.60","164.52.202.52","https://shikshaml.com","shikshaml.com","http://shikshaml.in","shikshaml.in","shikshaml-b2c-backend.vercel.app","https://shikshaml-b2c-backend.vercel.app","shikshaml-b2b.s3.amazonaws.com",'shikshaml-b2c.s3.amazonaws.com'],
   },
  
   // for react-pdf
   webpack: (config) => {
     config.resolve.alias.canvas = false;
     // You may not need this, it's just to support moduleResolution: 'node16'
     config.resolve.extensionAlias = {
       '.js': ['.js', '.ts', '.tsx'],
     };
     return config;
   },
 }

/*const nextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
  }
}*/

module.exports = nextConfig
