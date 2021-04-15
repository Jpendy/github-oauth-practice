
module.exports = class Post {

    id;
    image;
    caption;
    userId;

    constructor(row) {
        this.id = row.id;
        this.image = row.image;
        this.caption = row.caption;
        this.userId = row.user_id;
    }



}