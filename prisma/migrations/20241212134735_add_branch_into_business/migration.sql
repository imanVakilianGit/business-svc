/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `business` table. All the data in the column will be lost.
  - Added the required column `manager_id` to the `business` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "common"."gender_enum" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "common"."business" DROP CONSTRAINT "business_owner_id_fkey";

-- AlterTable
ALTER TABLE "common"."admin" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "common"."business" DROP COLUMN "owner_id",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "manager_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "common"."admin_role_enum";

-- CreateTable
CREATE TABLE "common"."province" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "info" TEXT,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."city" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "info" TEXT,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."address" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "province_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "alley" TEXT NOT NULL,
    "building_number" INTEGER NOT NULL,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."branch" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "business_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."section" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "business_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."employee" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "section_id" INTEGER,
    "employee_code" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "salary" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."manager" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "manager_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "common"."user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "national_code" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" "common"."gender_enum" NOT NULL,
    "active_status" "common"."active_status_enum" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common"."users_on_refresh_tokens" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "browser" TEXT NOT NULL,

    CONSTRAINT "users_on_refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "province_name_key" ON "common"."province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "province_code_key" ON "common"."province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "common"."city"("name");

-- CreateIndex
CREATE UNIQUE INDEX "address_branch_id_key" ON "common"."address"("branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_postal_code_key" ON "common"."address"("postal_code");

-- CreateIndex
CREATE UNIQUE INDEX "branch_code_key" ON "common"."branch"("code");

-- CreateIndex
CREATE UNIQUE INDEX "section_code_key" ON "common"."section"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_code_key" ON "common"."employee"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "manager_employee_id_key" ON "common"."manager"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_national_code_key" ON "common"."user"("national_code");

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_number_key" ON "common"."user"("mobile_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "common"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_on_refresh_tokens_user_id_key" ON "common"."users_on_refresh_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "common"."city" ADD CONSTRAINT "city_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "common"."province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."address" ADD CONSTRAINT "address_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "common"."province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."address" ADD CONSTRAINT "address_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "common"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."address" ADD CONSTRAINT "address_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "common"."branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."branch" ADD CONSTRAINT "branch_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "common"."manager"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."branch" ADD CONSTRAINT "branch_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "common"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."section" ADD CONSTRAINT "section_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "common"."manager"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."business" ADD CONSTRAINT "business_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "common"."manager"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."employee" ADD CONSTRAINT "employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "common"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."employee" ADD CONSTRAINT "employee_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "common"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."employee" ADD CONSTRAINT "employee_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "common"."branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."employee" ADD CONSTRAINT "employee_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "common"."section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."manager" ADD CONSTRAINT "manager_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "common"."employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common"."users_on_refresh_tokens" ADD CONSTRAINT "users_on_refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "common"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
