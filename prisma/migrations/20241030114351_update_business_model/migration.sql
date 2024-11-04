/*
  Warnings:

  - You are about to drop the `business_category_options` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `business_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `business_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `business_options` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "common"."business_category_options" DROP CONSTRAINT "business_category_options_business_category_id_fkey";

-- DropIndex
DROP INDEX "common"."business_category_title_key";

-- AlterTable
ALTER TABLE "common"."business_category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "common"."business_options" ADD COLUMN     "value" TEXT NOT NULL;

-- DropTable
DROP TABLE "common"."business_category_options";

-- CreateTable
CREATE TABLE "common"."business_category_options_template" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "business_category_id" INTEGER NOT NULL,

    CONSTRAINT "business_category_options_template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_category_slug_key" ON "common"."business_category"("slug");

-- AddForeignKey
ALTER TABLE "common"."business_category_options_template" ADD CONSTRAINT "business_category_options_template_business_category_id_fkey" FOREIGN KEY ("business_category_id") REFERENCES "common"."business_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
