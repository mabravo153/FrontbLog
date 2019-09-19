export class posts{

    constructor(
        public id: number,
        public title: string, 
        public content: string, 
        public image: string, 
        public fk_idcategories: number,
        public fk_idusers: number,
        public created_at: any
    ) {}
}