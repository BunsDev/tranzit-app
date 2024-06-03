import * as formidable from 'formidable';
import fs from "fs";
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
const pinataSDK = require("@pinata/sdk");
const pinata = new pinataSDK({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_API_KEY });

export const config = {
  api: {
    bodyParser: false,
  },
};

function createReadStreamFromBuffer(blob: Buffer) {
  const stream = new Readable();
  stream.push(blob);
  stream.push(null); // Signals the end of the stream

  return stream;
}

const saveFile = async (file: any) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);

    return response;
  } catch (error) {
    throw error;
  }
};

export async function GET(req: Request) {
  try {
    const response = await pinata.pinList(
      { pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_API_KEY },
      {
        pageLimit: 1,
      }
    );
    return new Response(response.rows[0]);
  } catch (e) {
    console.log(e);
    return new Response("Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const readStream = createReadStreamFromBuffer(buffer);
    const options = {
      pinataMetadata: {
        name: (file as File).name,
      },
    };
    const response = await pinata.pinFileToIPFS(readStream, options);
    const { IpfsHash } = await response;

    return new Response(IpfsHash);

  } catch (e) {
    console.log(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
