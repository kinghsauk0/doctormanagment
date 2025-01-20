/*
  Warnings:

  - You are about to drop the `_clinicscheduletodoctorclinic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctorclinic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctorpatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_clinicscheduletodoctorclinic` DROP FOREIGN KEY `_ClinicScheduleToDoctorClinic_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clinicscheduletodoctorclinic` DROP FOREIGN KEY `_ClinicScheduleToDoctorClinic_B_fkey`;

-- DropForeignKey
ALTER TABLE `doctorclinic` DROP FOREIGN KEY `DoctorClinic_clinicId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorclinic` DROP FOREIGN KEY `DoctorClinic_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorpatient` DROP FOREIGN KEY `DoctorPatient_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorpatient` DROP FOREIGN KEY `DoctorPatient_patientId_fkey`;

-- DropIndex
DROP INDEX `ClinicSchedule_doctorId_fkey` ON `clinicschedule`;

-- DropTable
DROP TABLE `_clinicscheduletodoctorclinic`;

-- DropTable
DROP TABLE `doctorclinic`;

-- DropTable
DROP TABLE `doctorpatient`;
