export interface IArticle {
    id: string;
    text: string;
    title: string;
    thumbnail?: string;
    image?: string;
    date: Date;
    section: string;
    author: string;
    url: string;
    origin: string;
}
