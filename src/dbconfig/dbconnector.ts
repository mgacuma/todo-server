
import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://miguelgacuma@localhost:5432/postgres',
    idleTimeoutMillis: 30000
});