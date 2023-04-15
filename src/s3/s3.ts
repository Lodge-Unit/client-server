import dotenv from "dotenv";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uuid } from "uuidv4";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const BUCKET = process.env.AWS_BUCKET;

// converting image to binary data(Buffer)
const streamToString = (stream: any) => {
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: any) => resolve(Buffer.from(chunk)));
    stream.on("error", (err: any) => reject(err));
    // stream.on("end", () => resolve(chunk));
  });
};

// uploading image to s3 bucket
export const uploadToS3 = async (file: any, userId: any) => {
  const { filename, mimetype, createReadStream } = await file;
  const image: any = await streamToString(createReadStream());

  const randomID = uuid();
  const key = `${userId}/${randomID}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: image,
    ContentType: mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

// getting array of image keys for a st of images
const getImageKeysByGroup = async (groupId: any) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: groupId,
  });
  const { Contents = [] } = await s3.send(command);

  return Contents.sort().map((image) => image.Key);
};

// getting urls of all images in a set of images
export const getPresignedUrls = async (groupId: any) => {
  try {
    const imageKeys = await getImageKeysByGroup(groupId);
    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: BUCKET,
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 900 });
      })
    );
    return { presignedUrls };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

// function to delete an image from s3 bucket
export const deleteObject = async (imageId: any) => {
  const input = {
    Bucket: BUCKET,
    Key: imageId,
  };

  const command = new DeleteObjectCommand(input);
  const response = await s3.send(command);
  return response;
};
