import type { Response } from "express";
import type { IRequest } from "@/types/request.js";
import { db } from "@/config/db.js";
import NoteService from "@/modules/notes/service.js";

const Create = async (req: IRequest, res: Response) => {
    const { title, content, color, collectionID } = req.body;

    // 1. Create Note
    const note = await NoteService.CreateNote({
        title,
        content,
        color,
        collectionID: collectionID ?? null,
        userID: req.user.id!,
    });

    // 2. Send response
    return res.status(201).json({
        success: true,
        status: 201,
        message: "Note created successfully.",
        data: {
            noteTitle: note.title,
        },
    });
};

const NoteController = {
    Create,
};

export default NoteController;
