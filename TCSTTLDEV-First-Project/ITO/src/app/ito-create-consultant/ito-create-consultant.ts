export class consultantDetails{
    firmId:number;
    firmName:string;
    spocId:number;
    spocName:string;
    emailId:string;
    contactNumber:string;
    city:string;
    state:string;
    country:string;
    district:string;
    pincode:string;
    address:string;
    spocActive:boolean;
    firmActive:boolean;

    constructor(obj){
        this.firmId=obj.firmId;
        this.firmName=obj.firmName;
        this.spocId=obj.spocId;
        this.spocName=obj.spocName;
        this.emailId=obj.emailId;
        this.contactNumber=obj.contactNumber;
        this.city=obj.city;
        this.state=obj.state;
        this.country=obj.country;
        this.district=obj.district;
        this.pincode=obj.country;
        this.address=obj.address;
        this.spocActive=obj.spocActive;
        this.firmActive=obj.firmActive;
    }
}