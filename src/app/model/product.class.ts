export class Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    count: number;
    isShow: boolean;

    constructor(name:string, price: number, image: string, category: string) {
        this.name = name;
        this. price = price;
        this. image = image;
        this. category = category;
    }

    getId(id:number){
        this.id = id;
    }
}