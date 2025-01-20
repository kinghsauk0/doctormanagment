/*
  Warnings:

  - You are about to drop the `doctorschedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `status` ENUM('active', 'inactive', 'deleted') NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `doctorqualification` MODIFY `qualificationDescription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `doctorspecialization` MODIFY `specializationDescription` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `doctorschedule`;

-- CreateTable
CREATE TABLE `Clinic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `clinicName` VARCHAR(191) NOT NULL,
    `clinicSpecialization` VARCHAR(191) NOT NULL,
    `pinCode` VARCHAR(191) NOT NULL,
    `gps` JSON NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clinic_uid_key`(`uid`),
    UNIQUE INDEX `Clinic_doctorId_key`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClinicSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `availabilityDays` JSON NOT NULL,
    `timeFrom` VARCHAR(191) NOT NULL,
    `timeTo` VARCHAR(191) NOT NULL,
    `visitingType` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ClinicSchedule_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClinicDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clinicId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ClinicDocument_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fristName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'inactive', 'deleted') NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Patient_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientAllergies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `environmentalAllergie` TEXT NOT NULL,
    `foodAllergie` TEXT NOT NULL,
    `drugAllergie` TEXT NOT NULL,
    `othersAllergies` TEXT NOT NULL,

    UNIQUE INDEX `PatientAllergies_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalHistroy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `related` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MedicalHistroy_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `Frequency` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Habit_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PatientDocument_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clinic` ADD CONSTRAINT `Clinic_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClinicSchedule` ADD CONSTRAINT `ClinicSchedule_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClinicSchedule` ADD CONSTRAINT `ClinicSchedule_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClinicDocument` ADD CONSTRAINT `ClinicDocument_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
