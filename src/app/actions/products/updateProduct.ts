"use server";
import { z } from "zod";
import { ProductType } from "@/@types/products";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

export type UpdateProductResponse = {
 sucess: boolean;
 error: {
  message: string | null;
 };
};

const productSchemaActionSchema = z.object({
 category_id: z
  .string({
   required_error: "por favor selecione a categoria",
  })
  .optional(),
 name: z
  .string({
   required_error: "Nome do produto obrigatório",
   message: "Por favor, insira o nome do produto.",
  })
  .min(1, {
   message: "Insira um nome maior para o produto",
  })
  .optional(),
 id: z.string().optional(),
 price_reals: z.number().optional(),
 price_cents: z.number().optional(),
 discount: z.number().optional(),
 stock: z.number().optional(),
 sold_off: z.boolean().optional(),
});

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

const client = new S3Client({
 endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
 region: "auto",
 credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
 },
});

export const UpdateProduct = async (
 data: ProductType,
 formData?: FormData
): Promise<UpdateProductResponse> => {
 try {
  const file = formData?.get("file") as File;

  const productSafed = productSchemaActionSchema.safeParse(data);

  if (!productSafed.success) {
   return {
    sucess: false,
    error: {
     message: productSafed.error.message,
    },
   };
  }

  // if not uploaded a image
  if (!file) {
   const body: ProductType = {
    category_id: productSafed.data?.category_id as string,
    name: productSafed.data?.name as string,
    stock: productSafed.data?.stock as number,
    price_reals: productSafed.data?.price_reals as number,
    price_cents: productSafed.data?.price_cents as number,
    discount: productSafed.data?.discount as number,
    sold_off: productSafed.data?.sold_off as boolean,
    id: productSafed.data?.id as string,
   };

   const update = await fetch("http://localhost:3000/api/product/update", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
   });

   if (update.status !== 200) {
    return {
     sucess: false,
     error: {
      message: "Falha ao atualizar o produto",
     },
    };
   }

   return {
    sucess: true,
    error: {
     message: null,
    },
   };
  }

  //------------------------------------- if exists a file uploaded-----------------------------//

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
    expiresIn: 60 * 60 * 24 * 7, // 1 year
   }
  );

  const body: ProductType = {
   category_id: productSafed.data?.category_id as string,
   name: productSafed.data?.name as string,
   stock: productSafed.data?.stock as number,
   price_reals: productSafed.data?.price_reals as number,
   price_cents: productSafed.data?.price_cents as number,
   discount: productSafed.data?.discount as number,
   sold_off: productSafed.data?.sold_off as boolean,
   image_key: key,
   image_url: getUploadSignedUrl,
   id: productSafed.data?.id as string,
  };

  await fetch("http://localhost:3000/api/product/update", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(body),
  });

  return {
   sucess: true,
   error: {
    message: null,
   },
  };
 } catch (err) {
  return {
   sucess: false,
   error: {
    message: "Ocorreu um erro ao atualizar o produto. Tente novamente em alguns minutos!",
   },
  };
 }
};
