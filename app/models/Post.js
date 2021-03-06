/**
 *  Post schema
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

/**
 *  Define Post Model
 *  @param {Object} schema
 *  @return {Object}
 **/
 var User = require('./User.js');
module.exports = function(schema){
    var Post = schema.define('post', {
        title: {type: schema.String},
        user_id: {type: schema.Integer},
        content: {type: schema.Text},
        created: {type: schema.Date}
    },{


    });
    Post.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id'
    });
    return Post;
};