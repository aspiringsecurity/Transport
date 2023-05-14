module.exports = class Data1681985493769 {
    name = 'Data1681985493769'

    async up(db) {
        await db.query(`CREATE TABLE "swap" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "from_account" text NOT NULL, "to_account" text NOT NULL, "fees" jsonb NOT NULL, "fee_rate" numeric NOT NULL, "from" jsonb NOT NULL, "to" jsonb NOT NULL, "height_id" character varying, CONSTRAINT "PK_4a10d0f359339acef77e7f986d9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4fa578a536fd22a4517d0ade99" ON "swap" ("height_id") `)
        await db.query(`CREATE INDEX "IDX_72c2b528daf6d47641fcaf0186" ON "swap" ("from_account") `)
        await db.query(`CREATE TABLE "dex_stable_fees" ("id" character varying NOT NULL, "pool_id" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "fee" numeric NOT NULL, "admin_fee" numeric, CONSTRAINT "PK_1b0b10450102adfe5f1df366fac" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_edd18145eaa147bd92d7bee3a8" ON "dex_stable_fees" ("pool_id") `)
        await db.query(`ALTER TABLE "swap" ADD CONSTRAINT "FK_4fa578a536fd22a4517d0ade995" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "swap"`)
        await db.query(`DROP INDEX "public"."IDX_4fa578a536fd22a4517d0ade99"`)
        await db.query(`DROP INDEX "public"."IDX_72c2b528daf6d47641fcaf0186"`)
        await db.query(`DROP TABLE "dex_stable_fees"`)
        await db.query(`DROP INDEX "public"."IDX_edd18145eaa147bd92d7bee3a8"`)
        await db.query(`ALTER TABLE "swap" DROP CONSTRAINT "FK_4fa578a536fd22a4517d0ade995"`)
    }
}
