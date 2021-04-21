import AWS, { AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import GetItemOutput = DocumentClient.GetItemOutput;
import { awsConfig } from './index';
import { UserItem } from '../../entities/user.entity';

export class DBService {

    /**
     *
     * Gets DynamoDB DocumentClient
     */
    static getDocumentClient() {
        AWS.config.update(awsConfig);

        return new AWS.DynamoDB.DocumentClient();
    }

    /**
     *
     * Used to create user
     * @param emailId
     * @param pass
     */
    static async create(emailId: string, pass: string): Promise<UserItem> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'users',
                Item: {
                    email_id: emailId,
                    hashPassword: pass
                }
            };
            const docClient = DBService.getDocumentClient();

            docClient.put(params, (err: AWSError, data: GetItemOutput) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(<UserItem>data);
                }
            });
        });
    }

    /**
     *
     * Used to read user data
     * @param emailId
     */
    static async read(emailId: string): Promise<UserItem> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'users',
                Key: {
                    email_id: emailId
                }
            };
            const docClient = DBService.getDocumentClient();

            docClient.get(params, (err: AWSError, data: GetItemOutput) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(<UserItem>data);
                }
            });
        });
    }

    /**
     *
     * Used to delete user
     * @param emailId
     */
    static async delete(emailId: string): Promise<UserItem> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'users',
                Key: {
                    email_id: emailId
                }
            };
            const docClient = DBService.getDocumentClient();

            docClient.delete(params, (err: AWSError, data: GetItemOutput) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(<UserItem>data);
                }
            });
        });
    }

    /**
     *
     * Used to update user
     * @param emailId
     * @param hashPassword
     */
    static async update(emailId: string, hashPassword: string): Promise<UserItem> {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: 'users',
                Key: {
                    email_id: emailId
                },
                UpdateExpression: 'set hashPassword = :newHash',
                ExpressionAttributeValues: {
                    ':newHash': hashPassword
                },
                ReturnValues: 'UPDATED_NEW'
            };
            const docClient = DBService.getDocumentClient();

            docClient.update(params, (err: AWSError, data: GetItemOutput) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(<UserItem>data);
                }
            });
        });
    }

}
