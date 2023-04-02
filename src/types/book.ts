export default interface Book {
    id: number;
    title: string;
    author: string;
    imageUrl: string
    description?: string;
    publishDate?: Date;
 }