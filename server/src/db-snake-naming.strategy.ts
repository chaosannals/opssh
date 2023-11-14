import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { snakeCase } from 'lodash';

export class DbSnakeNamingStrategy extends SnakeNamingStrategy {
    private prefix: string;

    constructor(prefix: string) {
        super();
        this.prefix = prefix;
    }

    tableName(className: string, customName: string): string {
        return customName ?? (this.prefix + snakeCase(className));
    }
}