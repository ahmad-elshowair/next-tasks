import { promises as fs } from "fs";
import path from "path";

type FileUploadResult = {
	success: boolean;
	filePath: string | null;
	error?: string;
};

type FileOptions = {
	maxSize?: number;
	allowedTypes?: string[];
};

export const uploadFile = async (
	file: File | null,
	directory: string = "uploads",
	options: FileOptions = {},
) => {
	// IF NO FILE RETURN SUCCESS WITH NULL FILE PATH.
	if (!file) {
		return { success: true, filePath: null };
	}

	// make the max size 500KB
	const {
		maxSize = 500 * 1024,
		allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"],
	} = options;

	// CHECK THE FILE SIZE
	if (file.size > maxSize) {
		return {
			success: false,
			filePath: null,
			error: `File size exceeds the limit of ${maxSize / 1024} KB`,
		};
	}

	// CHECK THE FILE TYPE.
	if (!allowedTypes.includes(file.type)) {
		return {
			success: false,
			filePath: null,
			error: `File type is not allowed, Allowed types: ${allowedTypes.join(
				", ",
			)}`,
		};
	}

	try {
		const fileBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(fileBuffer);

		// CREATE A UNIQUE FILE NAME.
		const uniqueFilename = `${new Date().getDate()}-${
			new Date().getMonth() + 1
		}-${new Date().getFullYear()}-${new Date().getMilliseconds()}-${file.name}`;

		// ENSURE THE UPLOAD DIRECTORY EXISTS.
		const uploadDir = path.join(process.cwd(), "public", directory);
		await fs.mkdir(uploadDir, { recursive: true });

		// DEFINE THE FULL PATH FOR THE FILE.
		const filePath = path.join(uploadDir, uniqueFilename);

		// WRITE THE FILE
		await fs.writeFile(filePath, buffer);

		// RETURN THE RELATIVE PATH TO THE FILE.
		return {
			success: true,
			filePath: path.join("/", directory, uniqueFilename).replace(/\\/g, "/"),
		};
	} catch (error) {
		console.error(`Failed to upload file ${error as Error}`);
		return {
			success: false,
			filePath: null,
			error: `Failed to upload file ${(error as Error).message}`,
		};
	}
};

export const deleteFile = async (filePath: string) => {
	try {
		const absoluteFilePath = path.join(process.cwd(), "public", filePath);

		// delete the file if it exists
		await fs.unlink(absoluteFilePath);
		return { success: true, message: `Deleted file: ${absoluteFilePath}` };
	} catch (error) {
		console.error(`Failed to delete file${error as Error}`);
		return {
			success: false,
			error: `Failed to delete file ${(error as Error).message}`,
			filePath: null,
		};
	}
};
