/*
  Warnings:

  - You are about to drop the column `important` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "important",
ADD COLUMN     "priority" INTEGER NOT NULL;
