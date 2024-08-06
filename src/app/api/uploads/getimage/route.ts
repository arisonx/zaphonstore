import { GetObjectAclCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
 try {
  //get image key from client
  const imagekey = (await req.json()) as string;

  // getting the image url
  const getUploadSignedUrl = await getSignedUrl(
   client,
   new GetObjectAclCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imagekey,
   }),
   {
    expiresIn: 60 * 5,
   }
  );

  return new Response(getUploadSignedUrl, {
   status: 200,
   headers: {
    "Content-Type": "application/json",
   },
  });
 } catch (err) {
  console.log(err);
  return new Response("Internal server error", { status: 500 });
 }
}
