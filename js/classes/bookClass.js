export class Book {
    id;
    name ;
    publishDate;
    price;
    author;
    
    constructor(id,name ,publishDate,price , author) {
        this.id = id;
        this.name = name;
        this.publishDate = publishDate;
        this.price = price;
        this.author = author;
    }
}