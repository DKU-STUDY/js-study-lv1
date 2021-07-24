const pool = require('../util/DBUtil.js');

exports.getItemList = async () => {
    const getItemList = "SELECT * FROM new_table";
    const [rows, fields] = await pool.query(getItemList);

    return JSON.parse(JSON.stringify(rows));
};

exports.insertItem = async (itemDTO) => {
    const insertItem = "INSERT INTO new_table(content, highlight, isComplete, selected) VALUES(?, ?, ?, ?)";
    await pool.query(insertItem, itemDTO);
};

exports.modifyItem = async (itemDTO) => {
    const modifyItem = "UPDATE new_table SET content=? WHERE id=?";
    await pool.query(modifyItem, itemDTO);
};

exports.deleteItem = async (itemDTO) => {
    const deleteItem = "DELETE FROM new_table WHERE id=?";
    await pool.query(deleteItem, itemDTO);
};

exports.selectItem = async (itemDTO) => {
    const selectItem = "UPDATE new_table SET selected=? WHERE id=?";
    await pool.query(selectItem, itemDTO);
}

exports.completeItem = async (itemDTO) => {
    const completeItem = "UPDATE new_table SET isComplete=? WHERE id=?";
    await pool.query(completeItem, itemDTO);
};

exports.toggleItem = async (itemDTO) => {
    const toggleItem = "UPDATE new_table SET highlight=? WHERE id=?";
    await pool.query(toggleItem, itemDTO);
};

exports.getItem = async (itemDTO) => {
    const getItem = "SELECT * FROM new_table WHERE id=?";
    const [ row, fields ] = await pool.query(getItem, itemDTO);

    return row[0];
};
