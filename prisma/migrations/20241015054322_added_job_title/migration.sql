/*
  Warnings:

  - Added the required column `habitName` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diseaseName` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `habit` ADD COLUMN `habitName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `medicalhistory` ADD COLUMN `diseaseName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `dateOfBirth` VARCHAR(191) NOT NULL;
