export interface ReviewResponse {
    id: number;
    stars: number;
    comment: string;
    replyComment: string;
    imageUrls: string[];
    createdAt: string;
    updatedAt: string;
    reviewDate: string;
    replyDate: string;
}