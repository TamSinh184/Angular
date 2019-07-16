export class User {
    id: number;
    name: string;
    picture: string;
    age: number;
    gender: boolean;
    country: string;
    email: string;
    constructor(name: string, picture: string, age: number, gender: boolean, country: string, email: string){
        this.name = name;
        this.picture = picture;
        this.age = age;
        this.gender = gender;
        this.country = country;
        this.email = email;
    }
}
