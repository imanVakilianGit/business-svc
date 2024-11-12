-- CreateTable
CREATE TABLE "common"."business_extra_options" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "business_id" INTEGER NOT NULL,

    CONSTRAINT "business_extra_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "common"."business_extra_options" ADD CONSTRAINT "business_extra_options_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "common"."business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
