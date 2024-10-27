-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "common";

-- CreateEnum
CREATE TYPE "common"."admin_role_enum" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "common"."active_status_enum" AS ENUM ('ACTIVE', 'DE_ACTIVE', 'BLOCK');

-- CreateTable
CREATE TABLE "common"."admin" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "national_code" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "role" "common"."admin_role_enum" NOT NULL DEFAULT 'ADMIN',
    "active_status" "common"."active_status_enum" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."admins_on_refresh_tokens" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,

    CONSTRAINT "admins_on_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."business" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,
    "business_category_id" INTEGER NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."business_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "business_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."business_category_options" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "business_category_id" INTEGER NOT NULL,

    CONSTRAINT "business_category_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."business_options" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "business_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_national_code_key" ON "common"."admin"("national_code");

-- CreateIndex
CREATE UNIQUE INDEX "admin_mobile_number_key" ON "common"."admin"("mobile_number");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "common"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_on_refresh_tokens_admin_id_key" ON "common"."admins_on_refresh_tokens"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_owner_id_key" ON "common"."business"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_business_category_id_key" ON "common"."business"("business_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_category_title_key" ON "common"."business_category"("title");

-- AddForeignKey
ALTER TABLE "common"."admins_on_refresh_tokens" ADD CONSTRAINT "admins_on_refresh_tokens_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "common"."admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."business" ADD CONSTRAINT "business_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "common"."admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."business" ADD CONSTRAINT "business_business_category_id_fkey" FOREIGN KEY ("business_category_id") REFERENCES "common"."business_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."business_category_options" ADD CONSTRAINT "business_category_options_business_category_id_fkey" FOREIGN KEY ("business_category_id") REFERENCES "common"."business_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."business_options" ADD CONSTRAINT "business_options_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "common"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
