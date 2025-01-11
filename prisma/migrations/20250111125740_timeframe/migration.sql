-- CreateTable
CREATE TABLE "Timeframe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeframe_id_key" ON "Timeframe"("id");

-- AddForeignKey
ALTER TABLE "Timeframe" ADD CONSTRAINT "Timeframe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
