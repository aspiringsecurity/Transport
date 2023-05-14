module.exports = class Data1682074512400 {
    name = 'Data1682074512400'

    async up(db) {
        await db.query(`CREATE TABLE "account_liquidity_provision" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amounts" jsonb NOT NULL, "account_id" text NOT NULL, "type" character varying(10) NOT NULL, "height_id" character varying, CONSTRAINT "PK_1bcda0f7b4e8ec35e3f0ff7e54f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_dbc624c68b8ed2cde516ecaae5" ON "account_liquidity_provision" ("height_id") `)
        await db.query(`CREATE INDEX "IDX_c2c002242ec2c8f804f52a60cf" ON "account_liquidity_provision" ("timestamp") `)
        await db.query(`CREATE INDEX "IDX_3a21d691bbc28616ebadd54dcf" ON "account_liquidity_provision" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_8fb49b4bc7c8db5dd9021b1923" ON "account_liquidity_provision" ("type") `)
        await db.query(`ALTER TABLE "account_liquidity_provision" ADD CONSTRAINT "FK_dbc624c68b8ed2cde516ecaae52" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "account_liquidity_provision"`)
        await db.query(`DROP INDEX "public"."IDX_dbc624c68b8ed2cde516ecaae5"`)
        await db.query(`DROP INDEX "public"."IDX_c2c002242ec2c8f804f52a60cf"`)
        await db.query(`DROP INDEX "public"."IDX_3a21d691bbc28616ebadd54dcf"`)
        await db.query(`DROP INDEX "public"."IDX_8fb49b4bc7c8db5dd9021b1923"`)
        await db.query(`ALTER TABLE "account_liquidity_provision" DROP CONSTRAINT "FK_dbc624c68b8ed2cde516ecaae52"`)
    }
}
