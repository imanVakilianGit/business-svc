-- DropForeignKey
-- ALTER TABLE "common"."business" DROP CONSTRAINT "business_manager_id_fkey";

-- AlterTable
-- ALTER TABLE "common"."business" ALTER COLUMN "manager_id" DROP NOT NULL;

-- AddForeignKey
-- ALTER TABLE "common"."business" ADD CONSTRAINT "business_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "common"."manager"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
