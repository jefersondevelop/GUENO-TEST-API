require('dotenv').config();

export class DatabaseConfig {

    constructor(private env = process.env) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
        throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeORMConfig() {
        return {
            type: 'mysql',

            host: this.getValue('MYSQL_HOST'),
            port: parseInt(this.getValue('MYSQL_PORT')),
            username: this.getValue('MYSQL_USER'),
            password: this.getValue('MYSQL_PASSWORD'),
            database: this.getValue('MYSQL_DATABASE'),
      
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      
            migrationsTableName: 'migration',
      
            migrations: ['src/migration/*.ts'],
      
            cli: {
              migrationsDir: 'src/migration',
            },
      
            ssl: this.isProduction(),
            //synchronize: true,
            logging: true
        }
    }
}