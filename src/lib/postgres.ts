// src/lib/postgres.ts
import { DataSource } from "typeorm";
import { logger } from "@/lib/winston";
import config from "@/config";
import { User } from "@/entities/userModel";
import { Account } from "@/entities/accountTree";
import { JournalEntry } from "@/entities/JournalEntry";
import { JournalDetails } from "@/entities/JournalDetails";
import { AccountRelation } from "@/entities/accountDetails";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true, // استخدم false في الإنتاج
  logging: false,
  entities: [User, Account, JournalEntry, JournalDetails,AccountRelation],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export const connectToDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    logger.info("Connected to PostgreSQL database");
  } catch (error) {
    logger.error("Failed to connect to the database");
    throw error;
  }
};

export const disconnectFromDataBase = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    logger.info("Disconnected from database");
  } catch (error) {
    logger.error("Error disconnecting from database");
    throw error;
  }
};
