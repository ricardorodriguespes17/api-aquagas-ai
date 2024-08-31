-- CreateTable
CREATE TABLE "Measure" (
    "uuid" UUID NOT NULL,
    "customer_code" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("uuid")
);
