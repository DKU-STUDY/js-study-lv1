const ItemRepository = require("../repository/ItemRepository.js");

exports.insertItem = (itemDTO) => {
    ItemRepository.insertItem(itemDTO);
}

exports.modifyItem = (itemDTO) => {
    ItemRepository.modifyItem(itemDTO);
}

exports.deleteItem = (itemDTO) => {
    ItemRepository.deleteItem(itemDTO);
}

exports.completeItem = (itemDTO) => {
    ItemRepository.completeItem(itemDTO);
}

exports.toggleItem = (itemDTO) => {
    ItemRepository.toggleItem(itemDTO);
}

exports.getItem = (itemDTO) => {
    return new Promise((resolve, reject) => {
        ItemRepository
            .getItem(itemDTO)
            .then(item => resolve(item))
            .catch(error => reject(error));
    });
}

exports.getItemList = () => {
    return new Promise(function(resolve, reject) {
        ItemRepository
            .getItemList()
            .then(itemList => resolve(itemList))
            .catch(error => reject(error));
    });
}
