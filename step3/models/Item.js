const pool = require('../util/DBUtil.js');

exports.getItemList = async () => {
    const getItemList = "SELECT * FROM new_table";
    try {
        const [rows, fields] = await pool.query(getItemList);
        return JSON.parse(JSON.stringify(rows));
    } catch (error) {
        throw error;
    }
};

exports.insertItem = async (itemDTO) => {
    const insertItem = "INSERT INTO new_table(content, completed, createAt) VALUES(?, ?, NOW())";
    try {
        await pool.query(insertItem, itemDTO);
    } catch(error) {
        throw error;
    }
};

exports.modifyItem = async (itemDTO) => {
    const modifyItem = "UPDATE new_table SET content=? WHERE id=?";
    try {
        await pool.query(modifyItem, itemDTO);
    } catch(error) {
        throw error;
    }
};

exports.deleteItem = async (itemDTO) => {
    const deleteItem = "DELETE FROM new_table WHERE id=?";
    try {
        await pool.query(deleteItem, itemDTO);
    } catch(error) {
        throw error;
    }
};

exports.toggleItem = async (itemDTO) => {
    const toggleItem = "UPDATE new_table SET completed=? WHERE id=?";
    try {
        await pool.query(toggleItem, itemDTO);
    } catch(error) {
        throw error;
    }
};

exports.getItem = async (itemDTO) => {
    const getItem = "SELECT * FROM new_table WHERE id=?";
    try {
        const [ row, fields ] = await pool.query(getItem, itemDTO);
        return JSON.parse(JSON.stringify(row[0]));
    } catch(error) {
        throw error;
    }
}