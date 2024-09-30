async function alterTableToApplyDataStructure(db) {
    return await
        db.sync({ alter: true })
            .then(() => console.log('Database synced successfully'))
            .catch(err => console.error('Error syncing database:', err));
}

module.exports = alterTableToApplyDataStructure;