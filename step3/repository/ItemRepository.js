const db_config = require('../util/DBUtil');

const conn = db_config.getConnection();
conn.connect();

// sql
const insertItem = "INSERT INTO new_table(content, highlight, completed, date) VALUES(?, ?, ?, NOW())";
const modifyItem = "UPDATE new_table SET content=? WHERE seq=?";
const deleteItem = "DELETE FROM new_table WHERE seq=?";
const completeItem = "UPDATE new_table SET completed=? WHERE seq=?";
const toggleItem = "UPDATE new_table SET highlight=? WHERE seq=?";
const getItem = "SELECT * FROM new_table WHERE seq=?";
const getItemList = "SELECT * FROM new_table";

exports.insertItem = (itemDTO) => {
    conn.query(insertItem, itemDTO, error => {
        if(error) console.log(error);
        else console.log('insert success!');
    })
}

exports.modifyItem = (itemDTO) => {
    conn.query(modifyItem, itemDTO, error => {
        if(error) console.log(error);
        else console.log('modify success!');
    })
}

exports.deleteItem = (itemDTO) => {
    conn.query(deleteItem, itemDTO, error => {
        if(error) console.log(error);
        else console.log('delete success');
    })
}

exports.completeItem = (itemDTO) => {
    conn.query(completeItem, itemDTO, error => {
        if(error) console.log(error);
        else console.log('update success');
    })
}

exports.toggleItem = (itemDTO) => {
    conn.query(toggleItem, itemDTO, error => {
        if(error) console.log(error);
        else console.log('toggle success');
    })
}

exports.getItem = (itemDTO) => {
    return new Promise((resolve, reject) => {
        conn.query(getItem, itemDTO, (error, item) => {
            if (error) reject(error);
            else resolve(JSON.parse(JSON.stringify(item)));
        })
    });
}

exports.getItemList = () => {
    return new Promise( (resolve, reject) => {
        conn.query(getItemList, (error, itemList) => {
            if(error) reject(error);
            else {
                const list =  JSON.parse(JSON.stringify(itemList));
                resolve(list);
            }
        })
    });
}
