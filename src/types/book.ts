export default interface Book {
    id: number;
    title: string;
    author: string;
    image: string
    description?: string;
    publishDate?: Date;
 }