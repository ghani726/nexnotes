import { db, type DBClient } from "@/config/db.js";
import { UnprocessableEntityError } from "@/utils/AppError.js";
import type { INote } from "@packages/types/notes.js";
import { Prisma } from "@prisma/client";

type Create = Pick<
    INote,
    "title" | "content" | "color" | "collectionID" | "userID"
>;

const CreateNote = async (newData: Create, client: DBClient = db) =>
    await client.note.create({ data: newData });

const UpdateNote = async (
    version: number,
    newData: INote,
    client: DBClient = db,
) => {
    try {
        return await client.note.update({
            where: {
                id: newData.id,
                userID: newData.userID,
                version: version,
            },
            data: { ...newData },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new UnprocessableEntityError(
                "This document was updated or deleted. Please refresh the page to get the latest information and try again.",
            );
        }

        throw error;
    }
};

const FindNote = async (
    userID: string,
    noteID: string,
    client: DBClient = db,
) =>
    await client.note.findUnique({
        where: { id: noteID, userID: userID },
    });

const FindNotes = async (userID: string, client: DBClient = db) =>
    await client.note.findMany({ where: { userID: userID } });

const DeleteNote = async (
    userID: string,
    noteID: string,
    client: DBClient = db,
) => await client.note.delete({ where: { id: noteID, userID: userID } });

const DeleteNotes = async (userID: string, client: DBClient = db) =>
    await client.note.deleteMany({ where: { userID: userID } });

const NoteService = {
    CreateNote,
    UpdateNote,
    FindNote,
    FindNotes,
    DeleteNote,
    DeleteNotes,
};

export default NoteService;
