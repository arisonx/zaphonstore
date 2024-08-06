import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

const client = new S3Client({
 endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
 region: "auto",
 credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
 },
});

export async function POST(req: Request) {
 // file uploaded from client
 const formData = await req.formData();
 const file = formData.get("file") as File;

 //file key
 const key = randomUUID().concat("-").concat(file.name);

 // getting signed url
 const signedUrl = await getSignedUrl(
  client,
  new PutObjectCommand({
   Bucket: process.env.AWS_BUCKET_NAME,
   Key: key,
   ContentType: file.type,
  }),
  {
   expiresIn: 60 * 10, //10 minutes,
  }
 );

 // uploading file to S3 bucket
 await fetch(signedUrl, {
  method: "PUT",
  headers: {
   "Content-Type": file.type,
  },
  body: file,
 });

 const getUploadSignedUrl = await getSignedUrl(
  client,
  new GetObjectCommand({
   Bucket: process.env.AWS_BUCKET_NAME,
   Key: key,
  }),
  {
   expiresIn: 60 * 5,
  }
 );

 return new Response(
  JSON.stringify({
   key: key,
   url: getUploadSignedUrl,
  }),
  {
   status: 200,
  }
 );
}
