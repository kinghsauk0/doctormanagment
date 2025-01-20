/*
  Warnings:

  - You are about to alter the column `gender` on the `doctor` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `Frequency` on the `habit` table. All the data in the column will be lost.
  - You are about to alter the column `gender` on the `tempdoctor` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to drop the `medicalhistroy` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `PatientAllergies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `frequency` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `PatientAllergies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` MODIFY `gender` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `habit` DROP COLUMN `Frequency`,
    ADD COLUMN `frequency` VARCHAR(191) NOT NULL,
    ADD COLUMN `patientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `doctorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patientallergies` ADD COLUMN `patientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tempdoctor` MODIFY `gender` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `medicalhistroy`;

-- CreateTable
CREATE TABLE `MedicalHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `related` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MedicalHistory_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Patient_email_key` ON `Patient`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `PatientAllergies_patientId_key` ON `PatientAllergies`(`patientId`);

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientAllergies` ADD CONSTRAINT `PatientAllergies_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalHistory` ADD CONSTRAINT `MedicalHistory_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
