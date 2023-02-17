/// ///////////////////////////////////////////////////
// INCLUDES
/// ///////////////////////////////////////////////////
const pool = require('./db'); // Import from db.js

// Does a for loop to loop through all he tables in the schema and delete is
const sql = `
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
`

pool.query(sql)
.then(() => {
    console.log(`Tables deleted`);
})
.catch((error) => {
    console.log(error)
});