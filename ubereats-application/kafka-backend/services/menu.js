
const Menu = require('../Models/MenuModel');

function handle_request(msg, callBack) {
    console.log("Inside menu handle request");

    if(msg.path == 'add-menu-details'){
        console.log("Inside add menu details handle request");
        const data = msg.data;
        var menudetails = new Menu({
            item_name: data.item_name,
            item_description: data.item_description, 
            item_price: data.item_price,
            item_category: data.item_category,
            resto_id: data.resto_id,
            item_image: data.item_image
          });
        console.log("Data from the request", data);
        menudetails.save(data, (error, result) => {
            if (error) {
                callBack(error);
            }
            console.log("Menu item added response", result);
            return callBack(null, result);
        });
    }

    if(msg.path == 'get-menu-items'){
        console.log("Inside get menu items handle request");
        const data = msg.data;
        Menu.find({resto_id: data }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        });     
    }

    if(msg.path == 'update-menu-items'){
        console.log("Inside update menu item details kafka handle request");
        const data = msg.data;
        console.log("Data from the request", data);
        console.log("Data from the request item item id", data.item_id);

        Menu.updateOne({ _id: data.item_id }, data, { upsert: false }, (error, result) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, result);
        })
    }

};
exports.handle_request = handle_request;