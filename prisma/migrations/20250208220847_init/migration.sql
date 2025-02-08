-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('pending', 'sent', 'denied', 'error');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'expired');

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "was_sent" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3),
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'pending',
    "denied_at" TIMESTAMP(3),
    "denied_reason" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "payed_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "provider_reference" TEXT,
    "provider_name" TEXT,
    "provider_data" JSONB,
    "payment_code" TEXT NOT NULL,
    "payment_image_url" TEXT,
    "message_id" INTEGER,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_uid_key" ON "messages"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "payments_uid_key" ON "payments"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "payments_message_id_key" ON "payments"("message_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
