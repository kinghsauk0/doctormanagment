/*
  Warnings:

  - Added the required column `eprescriptionId` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `diagnosis` DROP FOREIGN KEY `Diagnosis_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `finding` DROP FOREIGN KEY `Finding_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `investigation` DROP FOREIGN KEY `Investigation_patientId_fkey`;

-- AlterTable
ALTER TABLE `diagnosis` MODIFY `patientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `finding` MODIFY `patientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `investigation` MODIFY `patientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `medicine` ADD COLUMN `eprescriptionId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `LabTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `labTestName` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LabTest_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Advice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `AdviceName` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Advice_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `eprescriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Note_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FollowUp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `followUpDate` DATETIME(3) NOT NULL,
    `sos` BOOLEAN NULL DEFAULT false,
    `withReport` BOOLEAN NULL DEFAULT false,
    `eprescriptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FollowUp_uid_key`(`uid`),
    UNIQUE INDEX `FollowUp_eprescriptionId_key`(`eprescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Finding` ADD CONSTRAINT `Finding_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investigation` ADD CONSTRAINT `Investigation_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`uid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabTest` ADD CONSTRAINT `LabTest_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Advice` ADD CONSTRAINT `Advice_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowUp` ADD CONSTRAINT `FollowUp_eprescriptionId_fkey` FOREIGN KEY (`eprescriptionId`) REFERENCES `EPrescription`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
