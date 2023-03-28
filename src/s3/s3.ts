import dotenv from "dotenv";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uuid } from "uuidv4";
dotenv.config();

const s3 = new S3Client({});
const BUCKET = process.env.AWS_BUCKET;

export const uploadToS3 = async (file: any, userId: any) => {
  const { filename, mimetype } = await file;
  const randomID = uuid();
  const key = `${userId}/${randomID}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: filename,
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

const getImageKeysByGroup = async (groupId: any) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: groupId,
  });
  const { Contents = [] } = await s3.send(command);

  return Contents.map((image) => image.Key);
};

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
