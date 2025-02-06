
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            MongoURI: string;
            PORT: string;
        }
    }
}

export default {}