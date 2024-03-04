/*
  Warnings:

  - Added the required column `confirmPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmPassword` VARCHAR(191) NOT NULL,
    MODIFY `RegisteredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
