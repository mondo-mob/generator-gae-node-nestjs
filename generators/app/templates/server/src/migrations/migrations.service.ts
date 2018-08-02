import { Injectable } from "@nestjs/common";
import {
  CredentialRepository,
  newContext,
  DatastoreProvider,
  hashPassword,
  createLogger
} from "@3wks/gae-node-nestjs";
import { ConfigurationProvider } from "../config/config.provider";
import { UserRepository } from "../users/users.repository";
import { randomBytes } from "crypto";

const generatePassword = (bits: number) =>
  randomBytes(Math.ceil(bits / 8)).toString("base64");

@Injectable()
export class MigrationService {
  private readonly logger = createLogger("migration-service");

  constructor(
    private readonly credentialsRepository: CredentialRepository,
    private readonly userRepository: UserRepository,
    private readonly configurationProvider: ConfigurationProvider,
    private readonly datastoreProvider: DatastoreProvider
  ) {}

  async bootstrap() {
    if (this.configurationProvider.isDevelopment) {
      const context = newContext(this.datastoreProvider.datastore);

      const [credentials] = await this.credentialsRepository.query(context, {
        limit: 1
      });

      if (credentials.length === 0) {
        await this.bootstrapSystemUser("password");
      }
    }
  }

  async bootstrapSystemUser(
    password: string = generatePassword(256)
  ): Promise<void> {
    const context = newContext(this.datastoreProvider.datastore);

    this.logger.info(
      `Bootstrapping admin account with id 12345 and password ${password}`
    );

    await this.credentialsRepository.save(context, {
      id: "admin@3wks.com.au",
      type: "password",
      userId: "12345",
      password: await hashPassword(password)
    });

    await this.userRepository.save(context, {
      id: "12345",
      email: "admin@3wks.com.au",
      name: "Admin",
      roles: ["super", "admin"]
    });
  }
}
