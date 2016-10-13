/**
 * Created by bealiah on 16-10-4.
 */
var mongodb = require('../../mongodb');
var Schema = mongodb.mongoose.Schema;
var ProductSchema = new Schema({
    name : String,
    alias : [String],
    publish : Date,
    create_date : { type: Date, default: Date.now},
    source :[{
        source:String,
        link:String,
        swfLink:String,
        quality:String,
        version:String,
        lang:String,
        subtitle:String,
        create_date : { type: Date, default: Date.now }
    }]
});

module.exports = ProductSchema;