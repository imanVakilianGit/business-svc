/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `business_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "common"."business" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "business_name_key" ON "common"."business"("name");

-- CreateIndex
CREATE UNIQUE INDEX "business_slug_key" ON "common"."business"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "business_category_title_key" ON "common"."business_category"("title");
