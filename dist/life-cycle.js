import { logger } from '#src/util/logger';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LifeCycle {
    name;
    constructor(params) {
        const { name } = params;
        this.name = name;
    }
    async create() {
        logger().debug(`${this.name} Create START`);
        const result = await this._createFn();
        logger().debug(`${this.name} Create END`);
        return result;
    }
    async destroy() {
        logger().debug(`${this.name} Destroy START`);
        const result = await this._destroyFn();
        logger().debug(`${this.name} Destroy END`);
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZS1jeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9saWZlLWN5Y2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUV6Qyw4REFBOEQ7QUFDOUQsTUFBTSxPQUFnQixTQUFTO0lBSXJCLElBQUksQ0FBUTtJQUVyQixZQUFzQixNQUF3QjtRQUM3QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNYLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxDQUFBO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3JDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFBO1FBRXpDLE9BQU8sTUFBTSxDQUFBO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1osTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsQ0FBQTtRQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQTtRQUUxQyxPQUFPLE1BQU0sQ0FBQTtJQUNkLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZ2dlciB9IGZyb20gJyNzcmMvdXRpbC9sb2dnZXInXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTGlmZUN5Y2xlPFQgPSBhbnk+IHtcblx0cHJvdGVjdGVkIGFic3RyYWN0IF9jcmVhdGVGbigpOiBQcm9taXNlPFQ+XG5cdHByb3RlY3RlZCBhYnN0cmFjdCBfZGVzdHJveUZuKCk6IFByb21pc2U8VD5cblxuXHRyZWFkb25seSBuYW1lOiBzdHJpbmdcblxuXHRwcm90ZWN0ZWQgY29uc3RydWN0b3IocGFyYW1zOiB7IG5hbWU6IHN0cmluZyB9KSB7XG5cdFx0Y29uc3QgeyBuYW1lIH0gPSBwYXJhbXNcblx0XHR0aGlzLm5hbWUgPSBuYW1lXG5cdH1cblxuXHRhc3luYyBjcmVhdGUoKTogUHJvbWlzZTxUPiB7XG5cdFx0bG9nZ2VyKCkuZGVidWcoYCR7dGhpcy5uYW1lfSBDcmVhdGUgU1RBUlRgKVxuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2NyZWF0ZUZuKClcblx0XHRsb2dnZXIoKS5kZWJ1ZyhgJHt0aGlzLm5hbWV9IENyZWF0ZSBFTkRgKVxuXG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0YXN5bmMgZGVzdHJveSgpOiBQcm9taXNlPFQ+IHtcblx0XHRsb2dnZXIoKS5kZWJ1ZyhgJHt0aGlzLm5hbWV9IERlc3Ryb3kgU1RBUlRgKVxuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2Rlc3Ryb3lGbigpXG5cdFx0bG9nZ2VyKCkuZGVidWcoYCR7dGhpcy5uYW1lfSBEZXN0cm95IEVORGApXG5cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cbn1cbiJdfQ==