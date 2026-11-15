export interface INote {
    id?: string;
    userID: string;
    title: string;
    content: string | null;
    color: number;
    collectionID: string | null;

    // For concurrency
    version: number;

    // Status
    isPinned: boolean;
    isArchived: boolean;

    // Delete
    isDeleted: boolean;
    deletedAt: Date | string | null;

    // Public
    isPublic: boolean;
    publicId: string | null;

    // Time Stamps
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
