import { ReleaseAuti2Application } from '../..';
import { Client } from '@loopback/testlab';
export declare function setupApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    app: ReleaseAuti2Application;
    client: Client;
}
